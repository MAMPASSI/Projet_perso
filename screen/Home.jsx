import { ProduitsScreen } from './produitsScreen';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { utilisateur, seDeconnecter } = useAuth();

  return (
    <ProduitsScreen
      utilisateur={utilisateur}
      onDeconnexion={seDeconnecter}
    />
  );
}