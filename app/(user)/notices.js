import { useRouter } from 'expo-router';
import NoticesScreen from '../../screens/notifications/NoticesScreen';

export default function NoticesPage() {
  const router = useRouter();
  return <NoticesScreen onBack={() => router.back()} />;
}
