import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../screen/Home';              // export default → SANS accolades
import PanierCart from '../screen/PanierCart';  // export default → SANS accolades
import { usePanier } from '../context/PanierContext';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { nombreArticles } = usePanier();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const iconName = route.name === 'Accueil' ? 'home' : 'cart';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Accueil" component={Home} />

      <Tab.Screen
        name="Panier"
        component={PanierCart}
        options={{ tabBarBadge: nombreArticles > 0 ? nombreArticles : undefined }}
      />
    </Tab.Navigator>
  );
}