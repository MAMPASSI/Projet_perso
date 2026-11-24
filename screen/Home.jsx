import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import{ DrawerNavigator} from "../navigation/DrawerNavigator";
import { SafeAreaProvider,SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { InscriptionScreen } from './InscriptionScreen';
import { ProduitsScreen } from './produitsScreen';
import { LoginScreen } from './LoginScreen';

import { listerProduits } from '../database/produits';
import { initDb } from '../database/schema';
import { View, Text, Pressable } from 'react-native';
import styles from "../AppStyles"



function Home ({utilisateur,setUtilisateur}) {
    
    


    
  return(
    <>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <ProduitsScreen 
          utilisateur={utilisateur}
          onDeconnexion={() => setUtilisateur(null)}
        />
      
      </SafeAreaProvider>
     </>
  )
      

    

}

export default Home