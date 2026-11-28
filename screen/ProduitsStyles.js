import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // ---------- Écran ----------
  ecran: { flex: 1, backgroundColor: '#F3F4F6' },
  centre: { justifyContent: 'center', alignItems: 'center' },

  // ---------- En-tête fixe ----------
  fixe: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  ligneTitre: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titre: { fontSize: 26, fontWeight: '700', color: '#111827' },
  sousTitre: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  lienDeconnexion: { color: '#DC2626', fontSize: 14, fontWeight: '600' },
  bonjour: { fontSize: 14, color: '#374151', marginTop: 6 },

  // ---------- Recherche ----------
  champRecherche: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },

  // ---------- Catégories (puces) ----------
  listePuces: { flexGrow: 0, backgroundColor: '#FFFFFF' },
  puces: { paddingHorizontal: 12, paddingVertical: 10 },
  puce: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    marginRight: 8,
  },
  puceActive: { backgroundColor: '#2563EB' },
  puceTexte: { fontSize: 14, color: '#374151', fontWeight: '600' },
  puceTexteActive: { color: '#FFFFFF' },

  // ---------- Liste ----------
  liste: { padding: 12 },
  separateur: { height: 12 },
  entete: { marginBottom: 12 },
  vide: { textAlign: 'center', color: '#6B7280', marginTop: 40, fontSize: 16 },
  pied: { paddingVertical: 16 },

  // ---------- Carte produit ----------
  carte: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  nom: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  categorie: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  prix: { fontSize: 16, fontWeight: 'bold', color: '#2563EB', marginTop: 4 },
  stock: { fontSize: 13, color: '#16A34A', marginTop: 4 },
  rupture: { color: '#DC2626', fontWeight: 'bold' },

  // ---------- Boutons ----------
  bouton: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  boutonAjout: { backgroundColor: '#16A34A' },
  boutonPresse: { opacity: 0.7 },
  boutonTexte: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },

  // ---------- Erreur ----------
  messageErreur: {
    color: '#DC2626',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
});