import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../constants/colors';

export default function UnauthorizedScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Access Denied</Text>
      <Text style={styles.message}>You do not have permission to view this page.</Text>
      <Text style={styles.link} onPress={() => router.replace('/home')}>
        Go to Home
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: COLORS.background },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.error, marginBottom: 12 },
  message: { fontSize: 15, color: COLORS.textSecondary, textAlign: 'center', marginBottom: 24 },
  link: { fontSize: 15, color: COLORS.primary, fontWeight: '600' },
});
