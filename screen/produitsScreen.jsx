import { useState } from 'react';
import {
  View, Text, TextInput, FlatList, Pressable, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './ProduitsStyles';
import PanierCart from './PanierCart';
import CarteProduit from '../components/CarteProduit';
import BoutonPanier from '../components/BoutonPanier';
import { useProduits } from '../hooks/useProduits';

const Separateur = () => <View style={styles.separateur} />;

export const ProduitsScreen = ({ utilisateur, onDeconnexion }) => {
  const {
    produits, categories, total,
    recherche, setRecherche,
    categorie, setCategorie,
    chargement, rafraichissement, chargementPlus, erreur,
    reessayer, rafraichir, chargerPlus, ajouterProduitBDD,
  } = useProduits();

  const [afficherPanier, setAfficherPanier] = useState(false);

  const filtreActif = recherche.trim() !== '' || categorie !== null;

  if (chargement) {
    return (
      <SafeAreaView style={[styles.ecran, styles.centre]}>
        <ActivityIndicator size="large" color="#2563EB" />
      </SafeAreaView>
    );
  }

  if (erreur) {
    return (
      <SafeAreaView style={[styles.ecran, styles.centre]}>
        <Text style={styles.messageErreur}>{erreur}</Text>
        <Pressable
          onPress={reessayer}
          style={({ pressed }) => [styles.bouton, pressed && styles.boutonPresse]}
        >
          <Text style={styles.boutonTexte}>Réessayer</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  if (afficherPanier) {
    return <PanierCart onRetour={() => setAfficherPanier(false)} />;
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
            <Text style={styles.lienDeconnexion}>Se déconnecter</Text>
          </Pressable>
        </View>

        <Text style={styles.bonjour}>
          Connecté : {utilisateur?.prenom} {utilisateur?.nom}
        </Text>

        {/* <BoutonPanier onPress={() => setAfficherPanier(true)} /> */}

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
            style={[styles.puce, categorie === c && styles.puceActive]}
          >
            <Text style={[styles.puceTexte, categorie === c && styles.puceTexteActive]}>
              {c ?? 'Toutes'}
            </Text>
          </Pressable>
        )}
      />

      {/* Liste des produits */}
      <FlatList
        data={produits}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <CarteProduit produit={item} />}
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
              <Text style={styles.boutonTexte}>+ Ajouter un produit</Text>
            </Pressable>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.vide}>
            {filtreActif ? 'Aucun produit ne correspond' : 'Aucun produit à afficher'}
          </Text>
        }
        ListFooterComponent={
          chargementPlus ? <ActivityIndicator style={styles.pied} color="#2563EB" /> : null
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