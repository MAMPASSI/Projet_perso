import { View, Text, Image, Pressable, Alert, StyleSheet } from 'react-native';
import { usePanier } from '../context/PanierContext';
import { formaterPrix } from '../utils/formatage';
import { imagePour } from '../database/images';

export default function CarteProduit({ produit }) {
  const { ajouter, quantiteDe } = usePanier();

  const image = imagePour(produit.categorie);
  const rupture = Number(produit.stock) <= 0;
  const quantitePanier = quantiteDe(produit.id);

  const ajouterAuPanier = () => {
    const ok = ajouter({
      id: produit.id,
      nom: produit.nom,
      prix: Number(produit.prix),
      stock: Number(produit.stock),
      image,
    });
    if (!ok) Alert.alert('Stock insuffisant', 'Stock maximum atteint.');
  };

  return (
    <View style={styles.carte}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />

      <View style={styles.infos}>
        <Text style={styles.nom}>{produit.nom}</Text>
        <Text style={styles.categorie}>{produit.categorie}</Text>
        <Text style={styles.prix}>{formaterPrix(produit.prix)}</Text>

        <Text style={[styles.stock, rupture && styles.rupture]}>
          {rupture ? 'En rupture' : `Stock : ${produit.stock}`}
        </Text>

        {quantitePanier > 0 && (
          <Text style={styles.dansPanier}>Dans le panier : {quantitePanier}</Text>
        )}

        <Pressable
          onPress={ajouterAuPanier}
          disabled={rupture}
          style={({ pressed }) => [
            styles.bouton,
            rupture && styles.boutonDesactive,
            pressed && !rupture && styles.boutonPresse,
          ]}
        >
          <Text style={styles.boutonTexte}>
            {rupture ? 'Indisponible' : 'Ajouter au panier'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carte: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: '#E5E7EB',
  },
  infos: { flex: 1, justifyContent: 'center' },
  nom: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  categorie: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  prix: { fontSize: 16, fontWeight: 'bold', color: '#2563EB', marginTop: 4 },
  stock: { fontSize: 13, color: '#16A34A', marginTop: 4 },
  rupture: { color: '#DC2626', fontWeight: 'bold' },
  dansPanier: { color: '#2563EB', fontWeight: 'bold', marginTop: 4 },
  bouton: {
    backgroundColor: '#2563EB',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  boutonDesactive: { backgroundColor: '#9CA3AF' },
  boutonPresse: { opacity: 0.7 },
  boutonTexte: { color: '#FFFFFF', fontWeight: 'bold' },
});