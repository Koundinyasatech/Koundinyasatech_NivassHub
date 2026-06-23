import { useRouter } from 'expo-router';
import PaymentsScreen from '../../screens/payments/PaymentsScreen';

export default function PaymentsPage() {
  const router = useRouter();
  return <PaymentsScreen onBack={() => router.back()} />;
}
