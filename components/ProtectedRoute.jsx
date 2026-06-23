import { useSelector } from 'react-redux';
import { Redirect } from 'expo-router';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
    return <Redirect href="/unauthorized" />;
  }

  return children;
}
