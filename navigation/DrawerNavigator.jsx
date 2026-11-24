
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider,SafeAreaView } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';
import { View,Pressable,Text } from 'react-native';

import { ProfilScreen } from '../screen/ProfilScreen';
import { LoginScreen } from '../screen/LoginScreen';
import { InscriptionScreen } from '../screen/InscriptionScreen';

import TabNavigator from './TabNavigator';
import { Ionicons } from '@expo/vector-icons';
import styles from "../AppStyles"
import { useState,useEffect } from 'react';
import { initDb } from '../database/schema';
import {listerProduits,} from "../database/produits"


// Création du navigateur à tiroir
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    const [ecran, setEcran] = useState('login');
    const [utilisateur, setUtilisateur] = useState(null);
    const [dbReady, setDbReady] = useState(false);

    useEffect(() => {
        const initialiser = async () => {
            try {
                await initDb();
        
                const produits = await listerProduits();
                console.log('Nombre de produits :', produits.length);
        
                if (produits.length > 0) {
                  console.log(produits[0]);
                }

                setDbReady(true);

              } catch (error) {
                console.error('Erreur initialisation DB :', error);
              }

            };
        
            initialiser();
        }, []);

    
    
        if (!dbReady) {
            return null;
        }

        if(!utilisateur){
            return(
                <>
                <SafeAreaProvider>
                    <StatusBar style="dark" />
    
                    <View style={styles.ecran}>
                        {
                            ecran === 'login'
                            ? <LoginScreen onConnecte={setUtilisateur} />
                            : <InscriptionScreen />
                        }
                    </View>

                    <SafeAreaView edges={['bottom']} style={styles.zoneLien}>
                        <Pressable onPress={() => setEcran(ecran === 'login' ? 'inscription' : 'login')}>
                            <Text style={styles.lien}>
                                {
                                    ecran === 'login'
                                    ? "Pas encore de compte ? S'inscrire"
                                    : 'Déjà inscrit ? Se connecter'
                                }
                            </Text>
                        </Pressable>
                    </SafeAreaView>
                </SafeAreaProvider>
                </>
            )
        }
    return (
        <Drawer.Navigator initialRouteName="Menu Principal">
            <Drawer.Screen
                name="Menu Principal"
                
                options={
                    {
                        drawerIcon:({ color, size }) => {
                            <Ionicons name="home-outline" size={size} color={color} />
                        }
                    }
                }
            >

            
            {(screenProps) => (
                <TabNavigator {...{utilisateur, setUtilisateur}}  />)}
            </Drawer.Screen>

            
            <Drawer.Screen
                name="Profil"
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons
                            name="person-outline"
                            size={size}
                            color={color}
                        />
                    )
                }}
            >
                {(props) => (
                    <ProfilScreen
                        {...props}
                        utilisateur={utilisateur}
                        onDeconnexion={() => setUtilisateur(null)}
                    />
                )}
            </Drawer.Screen>

            
        </Drawer.Navigator>
    );
}
