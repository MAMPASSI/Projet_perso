import { View, Text, FlatList, Image, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import styles from './PanierCartStyles';
import { usePanier } from '../context/PanierContext';
import { formaterPrix } from '../utils/formatage';
import { imagePour } from '../database/images';

export default function PanierCart() {
  const navigation = useNavigation();
  const onRetour = () => navigation.navigate('Accueil');

  const { articles, incrementer, diminuer, supprimer, vider, nombreArticles, total } =
    usePanier();

  const augmenter = (id) => {
    if (!incrementer(id)) Alert.alert('Stock insuffisant', 'Stock maximum atteint.');
  };

  const viderPanier = () => {
    Alert.alert('Vider le panier', 'Voulez-vous supprimer tous les articles ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Vider', style: 'destructive', onPress: vider },
    ]);
  };

  const validerCommande = () => {
    Alert.alert('Confirmation', `Confirmer votre commande de ${formaterPrix(total)} ?`, [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Confirmer',
        onPress: () => {
          vider();
          Alert.alert('Commande validée', 'Votre commande a été validée avec succès !');
        },
      },
    ]);
  };

  const renderArticle = ({ item }) => (
    <View style={styles.carte}>
      <Image
        source={{ uri: item.image || imagePour() }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.informations}>
        <Text style={styles.nom}>{item.nom}</Text>
        <Text style={styles.prix}>{formaterPrix(item.prix)}</Text>
        <Text style={styles.sousTotal}>
          Sous-total : {formaterPrix(item.prix * item.quantite)}
        </Text>

        <View style={styles.commandes}>
          <Pressable style={styles.boutonQuantite} onPress={() => diminuer(item.id)}>
            <Text style={styles.texteQuantite}>−</Text>
          </Pressable>

          <Text style={styles.quantite}>{item.quantite}</Text>

          <Pressable style={styles.boutonQuantite} onPress={() => augmenter(item.id)}>
            <Text style={styles.texteQuantite}>+</Text>
          </Pressable>

          <Pressable style={styles.boutonSupprimer} onPress={() => supprimer(item.id)}>
            <Text style={styles.texteSupprimer}>Supprimer</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.ecran}>
      <View style={styles.entete}>
        <Pressable onPress={onRetour}>
          <Text style={styles.retour}>‹ Retour</Text>
        </Pressable>
        <Text style={styles.titre}>Mon panier</Text>
        <Text style={styles.nombre}>{nombreArticles} article(s)</Text>
      </View>

      {articles.length === 0 ? (
        <View style={styles.vide}>
          <Text style={styles.emoji}>🛒</Text>
          <Text style={styles.messageVide}>Votre panier est vide</Text>
          <Text style={styles.description}>
            Ajoutez des produits pour commencer vos achats.
          </Text>
          <Pressable style={styles.boutonRetour} onPress={onRetour}>
            <Text style={styles.texteBoutonRetour}>Voir les produits</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <FlatList
            data={articles}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderArticle}
            contentContainerStyle={styles.liste}
          />

          <View style={styles.resume}>
            <View style={styles.ligneTotal}>
              <Text style={styles.labelTotal}>Total à payer</Text>
              <Text style={styles.total}>{formaterPrix(total)}</Text>
            </View>

            <Pressable style={styles.boutonValider} onPress={validerCommande}>
              <Text style={styles.texteValider}>Valider la commande</Text>
            </Pressable>

            <Pressable style={styles.boutonVider} onPress={viderPanier}>
              <Text style={styles.texteVider}>Vider le panier</Text>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}