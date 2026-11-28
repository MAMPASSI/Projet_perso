import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

import { ProfilScreen } from '../screen/ProfilScreen';
import { LoginScreen } from '../screen/LoginScreen';
import { InscriptionScreen } from '../screen/InscriptionScreen';
import TabNavigator from './TabNavigator';

import { initDb } from '../database/schema';
import { listerProduits } from '../database/produits';
import { useAuth } from '../context/AuthContext';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  // L'utilisateur vient du Context 
  const { utilisateur } = useAuth();

  // Seul état local : connexion ou inscription
  const [ecran, setEcran] = useState('login');
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const initialiser = async () => {
      try {
        await initDb();

        const produits = await listerProduits();
        console.log('Nombre de produits :', produits.length);

        setDbReady(true);
      } catch (error) {
        console.error('Erreur initialisation DB :', error);
      }
    };

    initialiser();
  }, []);

  // Base pas encore prête
  if (!dbReady) {
    return null;
  }

  // Personne n'est connecté : connexion ou inscription
  if (!utilisateur) {
    return ecran === 'login' ? (
      <LoginScreen onAllerInscription={() => setEcran('inscription')} />
    ) : (
      <InscriptionScreen onAllerLogin={() => setEcran('login')} />
    );
  }

  // Connecté : le Drawer
  return (
    <Drawer.Navigator initialRouteName="Menu Principal">
      <Drawer.Screen
        name="Menu Principal"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Profil"
        component={ProfilScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}