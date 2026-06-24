import { Platform } from 'react-native';

const typography = {
  fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  sizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  weights: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
};

export default typography;
