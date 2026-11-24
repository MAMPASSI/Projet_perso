
import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './ProduitsStyles';
import PanierCart from './PanierCart';

import { initDb } from '../database/schema';
import {
  listerProduits,
  compterProduits,
  listerCategories,
  insererProduit,
} from '../database/produits';

const TAILLE_PAGE = 10;

// Images par catégorie
const imagesProduits = {
  Maison: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500',
  Informatique: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
  Téléphone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
  Vêtements: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
  Alimentaire: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=500',
  Maison: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500',
};

const imageDefaut ='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500';



const formaterPrix = (prix) =>
  Number(prix || 0).toFixed(2).replace('.', ',') + ' €';

// Carte d'un produit
const CarteProduit = ({ produit, onAjouter, quantitePanier }) => {
  const image = imagesProduits[produit.categorie] || imageDefaut;
  const rupture = Number(produit.stock) <= 0;

  return (
    <View style={[styles.carte, { padding: 12, borderRadius: 12 }]}>
      <Image
        source={{ uri: image }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          marginRight: 12,
          backgroundColor: '#E5E7EB',
        }}
        resizeMode="cover"
      />

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={styles.nom}>{produit.nom}</Text>

        <Text style={styles.categorie}>
          {produit.categorie}
        </Text>

        <Text style={styles.prix}>
          {formaterPrix(produit.prix)}
        </Text>

        <Text
          style={[
            styles.stock,
            rupture && styles.rupture,
          ]}
        >
          {rupture ? 'En rupture' : `Stock : ${produit.stock}`}
        </Text>

        {quantitePanier > 0 && (
          <Text style={{ color: '#2563EB', fontWeight: 'bold', marginTop: 4 }}>
            Dans le panier : {quantitePanier}
          </Text>
        )}

        <Pressable
          onPress={() => onAjouter(produit)}
          disabled={rupture}
          style={({ pressed }) => ({
            backgroundColor: rupture ? '#9CA3AF' : '#2563EB',
            paddingVertical: 9,
            paddingHorizontal: 12,
            borderRadius: 8,
            marginTop: 8,
            opacity: pressed && !rupture ? 0.7 : 1,
            alignSelf: 'flex-start',
          })}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
            {rupture ? 'Indisponible' : 'Ajouter au panier'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const Separateur = () => <View style={styles.separateur} />;

export const ProduitsScreen = ({ utilisateur, onDeconnexion }) => {
  // Données
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);

  // Panier : id produit => quantité
  const [panier, setPanier] = useState({});

  // Filtres
  const [recherche, setRecherche] = useState('');
  const [categorie, setCategorie] = useState(null);

  // Chargement
  const [version, setVersion] = useState(0);
  const [chargement, setChargement] = useState(true);
  const [rafraichissement, setRafraichissement] = useState(false);
  const [chargementPlus, setChargementPlus] = useState(false);
  const [erreur, setErreur] = useState(null);
  const [afficherPanier, setAfficherPanier] = useState(false);

  const generation = useRef(0);

  // Chargement des catégories
  useEffect(() => {
    initDb()
      .then(listerCategories)
      .then((liste) => setCategories([null, ...liste]))
      .catch(console.log);
  }, []);

  // Chargement des produits
  useEffect(() => {
    let actuel = true;
    generation.current += 1;

    const lire = async () => {
      try {
        await initDb();

        const [lignes, nombre] = await Promise.all([
          listerProduits({
            recherche,
            categorie,
            limite: TAILLE_PAGE,
            decalage: 0,
          }),
          compterProduits({ recherche, categorie }),
        ]);

        if (actuel) {
          setProduits(lignes);
          setTotal(nombre);
          setErreur(null);
        }
      } catch (e) {
        console.log(e);
        if (actuel) setErreur('Impossible de charger les produits');
      } finally {
        if (actuel) {
          setChargement(false);
          setRafraichissement(false);
        }
      }
    };

    lire();

    return () => {
      actuel = false;
    };
  }, [recherche, categorie, version]);

  const recharger = () => setVersion((v) => v + 1);

  const reessayer = () => {
    setChargement(true);
    recharger();
  };

  const rafraichir = () => {
    setRafraichissement(true);
    recharger();
  };

  // Ajouter un produit à la base (bouton existant)
  const ajouterProduitBDD = async () => {
    try {
      await insererProduit(
        `Nouveau produit ${Date.now() % 1000}`,
        'Maison',
        9.9,
        5
      );
      recharger();
    } catch (e) {
      console.log(e);
      setErreur("Impossible d'ajouter le produit");
    }
  };

  // Ajouter un article au panier
  const ajouterAuPanier = (produit) => {
    const quantiteActuelle = panier[produit.id]?.quantite || 0;

    if (quantiteActuelle >= Number(produit.stock)) {
      Alert.alert('Stock insuffisant', 'Stock maximum atteint.');
      return;
    }

    setPanier((ancienPanier) => ({
      ...ancienPanier,
      [produit.id]: {
        id: produit.id,
        nom: produit.nom,
        prix: Number(produit.prix),
        quantite: (ancienPanier[produit.id]?.quantite || 0) + 1,
        stock: Number(produit.stock),
        image: imagesProduits[produit.categorie] || imageDefaut,
      },
    }));
};



const incrementerPanier = (id) => {
  setPanier((ancien) => {
    const article = ancien[id];

    if (!article || article.quantite >= article.stock) {
      Alert.alert('Stock insuffisant');
      return ancien;
    }

    return {
      ...ancien,
      [id]: {
        ...article,
        quantite: article.quantite + 1,
      },
    };
  });
};

const decrementerPanier = (id) => {
  setPanier((ancien) => {
    const article = ancien[id];

    if (!article) return ancien;

    if (article.quantite <= 1) {
      const nouveau = { ...ancien };
      delete nouveau[id];
      return nouveau;
    }

    return {
      ...ancien,
      [id]: {
        ...article,
        quantite: article.quantite - 1,
      },
    };
  });
};

const supprimerDuPanier = (id) => {
  setPanier((ancien) => {
    const nouveau = { ...ancien };
    delete nouveau[id];
    return nouveau;
  });
};

const viderPanier = () => setPanier({});

const validerCommande = () => {
  Alert.alert(
    'Commande validée',
    'Votre commande a été validée avec succès !',
    [{ text: 'OK', onPress: () => setPanier({}) }]
  );
};


  // Quantité totale d'articles dans le panier
  const nombreArticlesPanier = Object.values(panier).reduce(
    (total, quantite) => total + quantite,
    0
  );

  // Prix total du panier
  const totalPanier = produits.reduce((total, produit) => {
    const quantite = panier[produit.id] || 0;
    return total + quantite * Number(produit.prix);
  }, 0);

  // Afficher le panier
  const voirPanier = () => {
    if (nombreArticlesPanier === 0) {
      Alert.alert('Panier', 'Votre panier est vide.');
      return;
    }

    const lignes = produits
      .filter((produit) => panier[produit.id])
      .map(
        (produit) =>
          `${produit.nom} x${panier[produit.id]} = ${formaterPrix(
            Number(produit.prix) * panier[produit.id]
          )}`
      );

    Alert.alert(
      'Mon panier',
      `${lignes.join('\n\n')}\n\nTotal : ${formaterPrix(totalPanier)}`,
      [
        { text: 'Fermer', style: 'cancel' },
        {
          text: 'Vider le panier',
          style: 'destructive',
          onPress: () => setPanier({}),
        },
      ]
    );
  };

  // Pagination
  const chargerPlus = async () => {
    if (chargementPlus || produits.length >= total) return;

    const lecture = generation.current;
    setChargementPlus(true);

    try {
      const suite = await listerProduits({
        recherche,
        categorie,
        limite: TAILLE_PAGE,
        decalage: produits.length,
      });

      if (lecture !== generation.current) return;

      setProduits((actuels) => [...actuels, ...suite]);
    } catch (e) {
      console.log(e);
    } finally {
      setChargementPlus(false);
    }
  };

  

  // Chargement initial
  if (chargement) {
    return (
      <SafeAreaView style={[styles.ecran, styles.centre]}>
        <ActivityIndicator size="large" color="#2563EB" />
      </SafeAreaView>
    );
  }

  // Erreur
  if (erreur) {
    return (
      <SafeAreaView style={[styles.ecran, styles.centre]}>
        <Text style={styles.messageErreur}>{erreur}</Text>

        <Pressable
          onPress={reessayer}
          style={({ pressed }) => [
            styles.bouton,
            pressed && styles.boutonPresse,
          ]}
        >
          <Text style={styles.boutonTexte}>Réessayer</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const filtreActif = recherche.trim() !== '' || categorie !== null;

  if (afficherPanier) {
  return (
    <PanierCart
      panier={panier}
      onIncrement={incrementerPanier}
      onDecrement={decrementerPanier}
      onSupprimer={supprimerDuPanier}
      onVider={viderPanier}
      onValider={validerCommande}
      onRetour={() => setAfficherPanier(false)}
    />
  );
}

  return (
    <SafeAreaView style={styles.ecran}>
      {/* En-tête */}
      <View style={styles.fixe}>
        <View style={styles.ligneTitre}>
          <View>
            <Text style={styles.titre}>Produits</Text>
            <Text style={styles.sousTitre}>
              {produits.length} / {total} produit(s)
            </Text>
          </View>

          <Pressable onPress={onDeconnexion}>
            <Text style={styles.lienDeconnexion}>
              Se déconnecter
            </Text>
          </Pressable>
        </View>

        <Text style={styles.bonjour}>
          Connecté : {utilisateur?.prenom} {utilisateur?.nom}
        </Text>

        {/* Bouton panier */}
        <Pressable
          onPress={() => setAfficherPanier(true)}
          style={{
            backgroundColor: '#16A34A',
            padding: 12,
            borderRadius: 10,
            marginVertical: 10,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
            Mon panier ({nombreArticlesPanier}) - {formaterPrix(totalPanier)}
          </Text>
        </Pressable>

        <TextInput
          style={styles.champRecherche}
          placeholder="Rechercher un produit"
          placeholderTextColor="#9CA3AF"
          autoCorrect={false}
          value={recherche}
          onChangeText={setRecherche}
        />
      </View>

      {/* Catégories */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        extraData={categorie}
        keyExtractor={(c) => c ?? 'toutes'}
        style={styles.listePuces}
        contentContainerStyle={styles.puces}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item: c }) => (
          <Pressable
            onPress={() => setCategorie(c)}
            style={[
              styles.puce,
              categorie === c && styles.puceActive,
            ]}
          >
            <Text
              style={[
                styles.puceTexte,
                categorie === c && styles.puceTexteActive,
              ]}
            >
              {c ?? 'Toutes'}
            </Text>
          </Pressable>
        )}
      />

      {/* Liste des produits */}
      <FlatList
        data={produits}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CarteProduit
            produit={item}
            onAjouter={ajouterAuPanier}
            quantitePanier={panier[item.id] || 0}
          />
        )}
        ItemSeparatorComponent={Separateur}
        ListHeaderComponent={
          <View style={styles.entete}>
            <Pressable
              onPress={ajouterProduitBDD}
              style={({ pressed }) => [
                styles.bouton,
                styles.boutonAjout,
                pressed && styles.boutonPresse,
              ]}
            >
              <Text style={styles.boutonTexte}>
                + Ajouter un produit
              </Text>
            </Pressable>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.vide}>
            {filtreActif
              ? 'Aucun produit ne correspond'
              : 'Aucun produit à afficher'}
          </Text>
        }
        ListFooterComponent={
          chargementPlus ? (
            <ActivityIndicator
              style={styles.pied}
              color="#2563EB"
            />
          ) : null
        }
        onEndReached={chargerPlus}
        onEndReachedThreshold={0.5}
        refreshing={rafraichissement}
        onRefresh={rafraichir}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.liste}
      />
    </SafeAreaView>
  );
};
