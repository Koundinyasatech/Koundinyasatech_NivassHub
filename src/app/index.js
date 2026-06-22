import { Redirect } from 'expo-router';
import { useSelector } from 'react-redux';

export default function Index() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return <Redirect href={isAuthenticated ? '/home' : '/login'} />;
}
