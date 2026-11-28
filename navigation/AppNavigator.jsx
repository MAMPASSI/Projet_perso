import { useState } from 'react';
import { LoginScreen } from '../screen/LoginScreen';
import { InscriptionScreen } from '../screen/InscriptionScreen';
import {  AccueilScreen } from '../screen/AcceuilScreen';
import { useAuth } from '../context/AuthContext';
import {PanierProvider} from "../context/PanierContext"

import {DrawerNavigator} from "./DrawerNavigator"


export default function AppNavigator() {
  const { estConnecte } = useAuth();
  const [ecran, setEcran] = useState('login');

  // Connecté : écran d'accueil
//   if (estConnecte) {
//     return(
//         <>
//         <NavigationContainer >
//             <DrawerNavigator />
//         </NavigationContainer>
//         </>
//     );
//   }


  if (estConnecte) {
  return (
    <PanierProvider>
      <DrawerNavigator />
    </PanierProvider>
  );
}

  // Pas connecté : connexion ou inscription
  return ecran === 'login' ? (
    <LoginScreen onAllerInscription={() => setEcran('inscription')} />
  ) : (
    <InscriptionScreen onAllerLogin={() => setEcran('login')} />
  );
}