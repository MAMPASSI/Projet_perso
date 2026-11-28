import { Pressable, Text, StyleSheet } from 'react-native';
import { usePanier } from '../context/PanierContext';
import { formaterPrix } from '../utils/formatage';

export default function BoutonPanier({ onPress }) {
  const { nombreArticles, total } = usePanier();

  return (
    <Pressable onPress={onPress} style={styles.bouton}>
      <Text style={styles.texte}>
        Mon panier ({nombreArticles}) - {formaterPrix(total)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bouton: {
    backgroundColor: '#16A34A',
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  texte: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});