export const ROLE_HOME_ROUTES = {
  admin: '/home',
  manager: '/home',
  resident: '/home',
};

export function getHomeRouteForRole(role) {
  return ROLE_HOME_ROUTES[role] ?? '/home';
}
