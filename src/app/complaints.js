import { useRouter } from 'expo-router';
import ComplaintsScreen from '../screens/complaints/ComplaintsScreen';

export default function ComplaintsPage() {
  const router = useRouter();
  return <ComplaintsScreen onBack={() => router.back()} />;
}
