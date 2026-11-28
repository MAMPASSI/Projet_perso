import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import DrawerNavigator from './navigation/DrawerNavigator';
import { AuthProvider } from './context/AuthContext';
import { PanierProvider } from './context/PanierContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AuthProvider>
        <PanierProvider>
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
        </PanierProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}