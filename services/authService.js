import users from '../data/users.json';

const MOCK_DELAY = 800;

const mockDelay = () => new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

const generateToken = (userId) =>
  `mock_jwt_token_${userId}_${Date.now()}`;

export const authService = {
  async login(email, password) {
    await mockDelay();

    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      throw new Error('No account found with this email address.');
    }

    if (user.status === 'inactive') {
      throw new Error('Your account is inactive. Please contact the admin.');
    }

    // Mock password check — in production this is handled by the backend
    if (password.length < 4) {
      throw new Error('Invalid email or password. Please try again.');
    }

    const token = generateToken(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        flat: user.flat,
        block: user.block,
        avatar: user.avatar,
      },
      token,
    };
  },

  async logout() {
    await mockDelay();
    return true;
  },

  async refreshToken(token) {
    await mockDelay();
    if (!token || !token.startsWith('mock_jwt_token_')) {
      throw new Error('Invalid or expired session. Please login again.');
    }
    return { token: `${token}_refreshed` };
  },

  async forgotPassword(email) {
    await mockDelay();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (!user) {
      throw new Error('No account found with this email address.');
    }
    return { message: 'Password reset link sent to your email.' };
  },
};
