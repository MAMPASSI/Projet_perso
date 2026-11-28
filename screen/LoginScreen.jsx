import { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Pressable, ScrollView,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './InscriptionStyles';
import { validerFormulaireLogin } from '../utils/validation';
import { initDb } from '../database/schema';
import { useAuth } from '../context/AuthContext';

export const LoginScreen = ({ onAllerInscription }) => {
  const { seConnecter } = useAuth();

  const [form, setForm] = useState({ email: '', mdp: '' });
  const [erreurs, setErreurs] = useState({});
  const [erreurGenerale, setErreurGenerale] = useState(null);

  useEffect(() => {
    initDb().catch((e) => console.log('Erreur init base', e));
  }, []);

  const maj = (champ, valeur) => setForm((f) => ({ ...f, [champ]: valeur }));

  const valider = async () => {
    setErreurGenerale(null);

    const e = validerFormulaireLogin(form);
    setErreurs(e);
    if (Object.keys(e).length > 0) return;

    // Si la connexion réussit, le Context met à jour utilisateur
    // et AppNavigator change d'écran tout seul
    const message = await seConnecter(form.email, form.mdp);
    if (message) setErreurGenerale(message);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.contenu} keyboardShouldPersistTaps="handled">
          <Text style={styles.titre}>Connexion</Text>

          <View style={styles.groupe}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.champ, erreurs.email && styles.champErreur]}
              placeholder="marie@mail.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={form.email}
              onChangeText={(t) => maj('email', t)}
            />
            {erreurs.email && <Text style={styles.erreur}>{erreurs.email}</Text>}
          </View>

          <View style={styles.groupe}>
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
              style={[styles.champ, erreurs.mdp && styles.champErreur]}
              placeholder="••••••"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={form.mdp}
              onChangeText={(t) => maj('mdp', t)}
            />
            {erreurs.mdp && <Text style={styles.erreur}>{erreurs.mdp}</Text>}
          </View>

          {erreurGenerale && <Text style={styles.erreur}>{erreurGenerale}</Text>}

          <Pressable
            onPress={valider}
            style={({ pressed }) => [styles.bouton, pressed && styles.boutonPresse]}
          >
            <Text style={styles.boutonTexte}>Se connecter</Text>
          </Pressable>

          <Pressable onPress={onAllerInscription} style={{ marginTop: 16, alignItems: 'center' }}>
            <Text style={{ color: '#2563EB', fontWeight: '600' }}>
              Pas encore de compte ? S'inscrire
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};