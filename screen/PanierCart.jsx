
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const formaterPrix = (prix) =>
  Number(prix || 0).toFixed(2).replace('.', ',') + ' €';

const imageDefaut ='https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500';

export default function PanierCart({ panier = {},onIncrement,onDecrement,onSupprimer,onVider,onValider,onRetour,}){
  const articles = Object.entries(panier).map(([id, produit]) => ({
      id,
      ...produit,
  }));

  const nombreArticles = articles.reduce(
      (total, produit) => total + produit.quantite,
      0
  );

  const total = articles.reduce(
      (somme, produit) => somme + produit.prix * produit.quantite,
      0
  );
    

  const viderPanier = () => {
      Alert.alert(
        'Vider le panier',
        'Voulez-vous supprimer tous les articles ?',
        [
          { text: 'Annuler', style: 'cancel' },
          {
            text: 'Vider',
            style: 'destructive',
            onPress: onVider,
          },
        ]
      );
  };

  const validerCommande = () => {
      if (articles.length === 0) {
        Alert.alert('Panier vide', 'Ajoutez des produits avant de valider.');
        return;
      }

      Alert.alert(
        'Confirmation',
        `Confirmer votre commande de ${formaterPrix(total)} ?`,
        [
          { text: 'Annuler', style: 'cancel' },
          {
            text: 'Confirmer',
            onPress: onValider,
          },
        ]
      );
  };

  const renderArticle = ({ item }) => (
      <View style={styles.carte}>
        <Image
          source={{ uri: item.image || imageDefaut }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.informations}>
          <Text style={styles.nom}>{item.nom}</Text>

          <Text style={styles.prix}>
            {formaterPrix(item.prix)}
          </Text>

          <Text style={styles.sousTotal}>
            Sous-total : {formaterPrix(item.prix * item.quantite)}
          </Text>

          <View style={styles.commandes}>
            <Pressable
              style={styles.boutonQuantite}
              onPress={() => onDecrement(item.id)}
            >
              <Text style={styles.texteQuantite}>−</Text>
            </Pressable>

            <Text style={styles.quantite}>{item.quantite}</Text>

            <Pressable
              style={styles.boutonQuantite}
              onPress={() => onIncrement(item.id)}
            >
              <Text style={styles.texteQuantite}>+</Text>
            </Pressable>

            <Pressable
              style={styles.boutonSupprimer}
              onPress={() => onSupprimer(item.id)}
            >
              <Text style={styles.texteSupprimer}>Supprimer</Text>
            </Pressable>
          </View>
        </View>
      </View>
  );

  

  return (
      <SafeAreaView style={styles.ecran}>
        {/* En-tête */}
        <View style={styles.entete}>
          <Pressable onPress={onRetour}>
            <Text style={styles.retour}>‹ Retour</Text>
          </Pressable>

          <Text style={styles.titre}>Mon panier </Text>

          <Text style={styles.nombre}>
            {nombreArticles} article(s)
          </Text>
        </View>

        {articles.length === 0 ? (
          <View style={styles.vide}>
            <Text style={styles.emoji}></Text>
            <Text style={styles.messageVide}>Votre panier est vide</Text>
            <Text style={styles.description}>
              Ajoutez des produits pour commencer vos achats.
            </Text>

            <Pressable style={styles.boutonRetour} onPress={onRetour}>
              <Text style={styles.texteBoutonRetour}>
                Voir les produits
              </Text>
            </Pressable>
          </View>
        ) : (
          <>
            <FlatList
              data={articles}
              keyExtractor={(item) => item.id}
              renderItem={renderArticle}
              contentContainerStyle={styles.liste}
            />

            {/* Résumé */}
            <View style={styles.resume}>
              <View style={styles.ligneTotal}>
                <Text style={styles.labelTotal}>Total à payer</Text>
                <Text style={styles.total}>{formaterPrix(total)}</Text>
              </View>

              <Pressable
                style={styles.boutonValider}
                onPress={validerCommande}
              >
                <Text style={styles.texteValider}>
                  Valider la commande
                </Text>
              </Pressable>

              <Pressable
                style={styles.boutonVider}
                onPress={viderPanier}
              >
                <Text style={styles.texteVider}>Vider le panier</Text>
              </Pressable>
            </View>
          </>
        )}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ecran: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  entete: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },

  retour: {
    color: '#2563EB',
    fontSize: 16,
    marginBottom: 10,
  },

  titre: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },

  nombre: {
    color: '#6B7280',
    marginTop: 5,
  },

  liste: {
    padding: 12,
  },

  carte: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  image: {
    width: 100,
    height: 110,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
  },

  informations: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },

  nom: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },

  prix: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: 'bold',
    marginTop: 5,
  },

  sousTotal: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },

  commandes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    flexWrap: 'wrap',
  },

  boutonQuantite: {
    backgroundColor: '#E5E7EB',
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  texteQuantite: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },

  quantite: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },

  boutonSupprimer: {
    marginLeft: 12,
  },

  texteSupprimer: {
    color: '#DC2626',
    fontSize: 13,
  },

  resume: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  ligneTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  labelTotal: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111827',
  },

  total: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#16A34A',
  },

  boutonValider: {
    backgroundColor: '#16A34A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  texteValider: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  boutonVider: {
    padding: 12,
    alignItems: 'center',
    marginTop: 5,
  },

  texteVider: {
    color: '#DC2626',
  },

  vide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },

  emoji: {
    fontSize: 60,
  },

  messageVide: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#111827',
  },

  description: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 8,
  },

  boutonRetour: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },

  texteBoutonRetour: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
