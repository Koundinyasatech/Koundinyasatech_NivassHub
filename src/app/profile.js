import { useRouter } from 'expo-router';
import ProfileScreen from '../screens/profile/ProfileScreen';

export default function ProfilePage() {
  const router = useRouter();
  return <ProfileScreen onBack={() => router.back()} />;
}
