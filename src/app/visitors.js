import { useRouter } from 'expo-router';
import VisitorsScreen from '../screens/visitors/VisitorsScreen';

export default function VisitorsPage() {
  const router = useRouter();
  return <VisitorsScreen onBack={() => router.back()} />;
}
