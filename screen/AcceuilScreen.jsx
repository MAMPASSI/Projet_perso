import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

export const AccueilScreen = () => {
  const { utilisateur, seDeconnecter } = useAuth();

  return (
    <SafeAreaView style={styles.racine}>
      <View style={styles.centre}>
        <Text style={styles.titre}>
          Bonjour {utilisateur.prenom} {utilisateur.nom}
        </Text>
        <Text style={styles.texte}>{utilisateur.email}</Text>

        <Pressable
          onPress={seDeconnecter}
          style={({ pressed }) => [styles.bouton, pressed && styles.boutonPresse]}
        >
          <Text style={styles.boutonTexte}>Se déconnecter</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  racine: { flex: 1, backgroundColor: '#fff' },
  centre: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  titre: { fontSize: 24, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  texte: { fontSize: 16, color: '#6B7280', marginBottom: 24 },
  bouton: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  boutonPresse: { opacity: 0.7 },
  boutonTexte: { color: '#fff', fontSize: 16, fontWeight: '600' },
});