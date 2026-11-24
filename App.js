import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
import { SafeAreaProvider,SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { InscriptionScreen } from './screen/InscriptionScreen';
import { ProduitsScreen } from './screen/produitsScreen';
import { LoginScreen } from './screen/LoginScreen';

import { listerProduits } from './database/produits';
import { initDb } from './database/schema';
import { View, Text, Pressable } from 'react-native';
import styles from "./AppStyles"

export default function App() {
  
  return (
    <>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </>
  )
}