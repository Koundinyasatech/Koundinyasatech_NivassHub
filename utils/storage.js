import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  get: async key => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  set: async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  remove: async key => {
    await AsyncStorage.removeItem(key);
  },
  clear: async () => {
    await AsyncStorage.clear();
  },
};
