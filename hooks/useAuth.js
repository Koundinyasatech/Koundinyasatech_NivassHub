import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logoutUser, clearAuthError } from '../store/slices/authSlice';

export function useAuth() {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login: (credentials) => dispatch(loginUser(credentials)),
    logout: () => dispatch(logoutUser()),
    clearError: () => dispatch(clearAuthError()),
  };
}
