// import { Redirect } from 'expo-router';
// import { useSelector } from 'react-redux';

// export default function Index() {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   return <Redirect href={isAuthenticated ? '/home' : '/splash'} />;
// }

//////////////////////////////////////

// app/index.js
import { Redirect } from 'expo-router';
import { useSelector } from 'react-redux';

export default function Index() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  // Always show splash screen first
  return <Redirect href="/splash" />;
}