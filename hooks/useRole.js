import { useSelector } from 'react-redux';
import { ROLES } from '../constants/roles';

export function useRole() {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role ?? null;

  return {
    role,
    isAdmin: role === ROLES.ADMIN,
    isManager: role === ROLES.MANAGER,
    isResident: role === ROLES.RESIDENT,
    hasRole: (r) => role === r,
  };
}
