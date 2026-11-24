import { useState } from 'react';
import { View, Text, Pressable, Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Écran Profil : affiche les informations de l'utilisateur connecté.
// Props reçues depuis DrawerNavigator :
//   - utilisateur : { id, nom, prenom, email } (renvoyé par verifierConnexion)
//   - onDeconnexion : fonction qui remet utilisateur à null dans App.js
export const ProfilScreen = ({ utilisateur, onDeconnexion }) => {
  // true : la fenêtre modale est affichée, false : elle est cachée
  const [modalVisible, setModalVisible] = useState(false);

  // Initiales pour l'avatar (ex. "Marie Dupont" -> "MD")
  const initiales = utilisateur
    ? `${utilisateur.prenom?.[0] ?? ''}${utilisateur.nom?.[0] ?? ''}`.toUpperCase()
    : '?';

  const confirmerDeconnexion = () => {
    setModalVisible(false);
    onDeconnexion && onDeconnexion();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.contenu}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTexte}>{initiales}</Text>
        </View>

        <Text style={styles.titre}>
          {utilisateur ? `${utilisateur.prenom} ${utilisateur.nom}` : 'Profil'}
        </Text>

        {utilisateur && (
          <View style={styles.carte}>
            <View style={styles.ligne}>
              <Text style={styles.label}>Nom</Text>
              <Text style={styles.valeur}>{utilisateur.nom}</Text>
            </View>
            <View style={styles.ligne}>
              <Text style={styles.label}>Prénom</Text>
              <Text style={styles.valeur}>{utilisateur.prenom}</Text>
            </View>
            <View style={[styles.ligne, styles.derniereLigne]}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.valeur}>{utilisateur.email}</Text>
            </View>
          </View>
        )}

        {/* Le bouton ne déconnecte plus directement : il ouvre la modale */}
        {onDeconnexion && (
          <Pressable
            onPress={() => setModalVisible(true)}
            style={({ pressed }) => [styles.bouton, pressed && styles.boutonPresse]}
          >
            <Text style={styles.boutonTexte}>Se déconnecter</Text>
          </Pressable>
        )}
      </View>

      {/* Fenêtre modale de confirmation */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)} // bouton retour Android
      >
        {/* Fond sombre : un appui en dehors de la boîte ferme la modale */}
        <Pressable style={styles.fond} onPress={() => setModalVisible(false)}>
          {/* Boîte centrale : le Pressable interne empêche la fermeture au toucher */}
          <Pressable style={styles.boite} onPress={() => {}}>
            <Text style={styles.modalTitre}>Déconnexion</Text>
            <Text style={styles.modalTexte}>
              Voulez-vous vraiment vous déconnecter ?
            </Text>

            <View style={styles.modalBoutons}>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={({ pressed }) => [
                  styles.boutonModal,
                  styles.boutonAnnuler,
                  pressed && styles.boutonPresse,
                ]}
              >
                <Text style={styles.annulerTexte}>Annuler</Text>
              </Pressable>

              <Pressable
                onPress={confirmerDeconnexion}
                style={({ pressed }) => [
                  styles.boutonModal,
                  styles.boutonConfirmer,
                  pressed && styles.boutonPresse,
                ]}
              >
                <Text style={styles.boutonTexte}>Confirmer</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  contenu: { flex: 1, alignItems: 'center', padding: 20, paddingTop: 40 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarTexte: { color: '#fff', fontSize: 34, fontWeight: '700' },
  titre: { fontSize: 24, fontWeight: '700', marginBottom: 24, textAlign: 'center' },
  carte: {
    alignSelf: 'stretch',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  ligne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  derniereLigne: { borderBottomWidth: 0 },
  label: { fontSize: 14, fontWeight: '600', color: '#6B7280' },
  valeur: { fontSize: 16 },
  bouton: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 30,
  },
  boutonPresse: { opacity: 0.7 },
  boutonTexte: { color: '#fff', fontSize: 16, fontWeight: '600' },

  // --- Modal ---
  fond: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  boite: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
  },
  modalTitre: { fontSize: 20, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  modalTexte: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 20 },
  modalBoutons: { flexDirection: 'row', gap: 12 },
  boutonModal: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  boutonAnnuler: { backgroundColor: '#F3F4F6' },
  boutonConfirmer: { backgroundColor: '#DC2626' },
  annulerTexte: { color: '#111827', fontSize: 16, fontWeight: '600' },
});