import { createContext, useContext, useState } from 'react';
import { verifierConnexion } from '../database/utilisateur';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // null = personne n'est connecté, sinon { id, nom, prenom, email }
  const [utilisateur, setUtilisateur] = useState(null);

  // Renvoie null si la connexion réussit, sinon un message d'erreur
  const seConnecter = async (email, mdp) => {
  console.log('1. seConnecter appelé', email);
  try {
    const trouve = await verifierConnexion(email, mdp);
    console.log('2. résultat base :', trouve);
    if (!trouve) return 'Email ou mot de passe incorrect';
    setUtilisateur(trouve);
    console.log('3. utilisateur enregistré');
    return null;
  } catch (e) {
    console.log('ERREUR seConnecter :', e);
    return 'Connexion impossible, veuillez réessayer';
  }
};

  const seDeconnecter = () => setUtilisateur(null);

  // Valeur calculée, pas un état
  const estConnecte = utilisateur !== null;

  return (
    <AuthContext.Provider
      value={{ utilisateur, estConnecte, seConnecter, seDeconnecter }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const contexte = useContext(AuthContext);
  if (!contexte) {
    throw new Error("useAuth doit être utilisé à l'intérieur de <AuthProvider>");
  }
  return contexte;
};