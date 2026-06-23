// app/_layout.js
import { Provider } from 'react-redux';
import { store } from '../redux/store/store';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../constants/colors';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor={COLORS.primary} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="splash" />
          <Stack.Screen name="login" />
          <Stack.Screen name="home" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="visitors" />
          <Stack.Screen name="complaints" />
          <Stack.Screen name="notices" />
          <Stack.Screen name="payments" />
        </Stack>
      </SafeAreaProvider>
    </Provider>
  );
}
