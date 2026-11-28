import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  ecran: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  // ---------- En-tête ----------
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

  // ---------- Liste des articles ----------
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

  // ---------- Boutons − / + / Supprimer ----------
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

  // ---------- Résumé (total + boutons du bas) ----------
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

  // ---------- Panier vide ----------
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