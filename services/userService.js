import users from '../data/users.json';
import properties from '../data/properties.json';

const MOCK_DELAY = 600;
const mockDelay = () => new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

export const userService = {
  async getAllUsers() {
    await mockDelay();
    return users;
  },

  async getUserById(userId) {
    await mockDelay();
    const user = users.find((u) => u.id === userId);
    if (!user) throw new Error(`User with id "${userId}" not found.`);
    return user;
  },

  async getResidents() {
    await mockDelay();
    return users.filter((u) => u.role === 'resident');
  },

  async getAdmins() {
    await mockDelay();
    return users.filter((u) => u.role === 'admin');
  },

  async getUserProperty(userId) {
    await mockDelay();
    const property = properties.find((p) => p.ownerId === userId);
    return property || null;
  },

  async updateUserProfile(userId, updates) {
    await mockDelay();
    const user = users.find((u) => u.id === userId);
    if (!user) throw new Error(`User with id "${userId}" not found.`);
    // In production this would call the API
    return { ...user, ...updates };
  },

  async searchResidents(query) {
    await mockDelay();
    const q = query.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.flat.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    );
  },
};
