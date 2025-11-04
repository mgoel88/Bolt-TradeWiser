/**
 * TradeWiser™ Design System
 * Consistent colors, typography, spacing, and design tokens
 */

export const colors = {
  // Brand Colors
  primary: {
    navy: '#0A2E50',      // Primary brand color
    navyLight: '#1a4570',
    navyDark: '#051a30',
  },
  secondary: {
    gold: '#B88A3D',      // Secondary/accent color
    goldLight: '#d4a558',
    goldDark: '#9a7332',
  },
  neutral: {
    gray: '#8E8B80',      // Tertiary/supporting color
    grayLight: '#a8a59b',
    grayDark: '#6e6b62',
  },
  
  // Functional Colors
  success: '#10B981',     // Green for positive actions
  warning: '#F59E0B',     // Orange for warnings
  error: '#EF4444',       // Red for errors
  info: '#3B82F6',        // Blue for information
  
  // Background Colors
  background: {
    white: '#FFFFFF',
    light: '#F9FAFB',
    gray: '#F3F4F6',
    dark: '#1F2937',
  },
  
  // Text Colors
  text: {
    primary: '#111827',
    secondary: '#4B5563',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
  },
};

export const typography = {
  // Font Families
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  
  // Font Sizes
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
  },
  
  // Font Weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const spacing = {
  // Spacing Scale (in rem)
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
};

export const transitions = {
  fast: '150ms ease-in-out',
  base: '200ms ease-in-out',
  slow: '300ms ease-in-out',
};

// Component-specific styles
export const components = {
  button: {
    primary: {
      bg: colors.secondary.gold,
      hover: colors.secondary.goldDark,
      text: colors.text.inverse,
      padding: `${spacing[3]} ${spacing[6]}`,
      borderRadius: borderRadius.lg,
      fontWeight: typography.fontWeight.semibold,
    },
    secondary: {
      bg: colors.primary.navy,
      hover: colors.primary.navyLight,
      text: colors.text.inverse,
      padding: `${spacing[3]} ${spacing[6]}`,
      borderRadius: borderRadius.lg,
      fontWeight: typography.fontWeight.semibold,
    },
  },
  card: {
    bg: colors.background.white,
    border: `1px solid ${colors.background.gray}`,
    borderRadius: borderRadius['2xl'],
    shadow: shadows.lg,
    padding: spacing[8],
  },
};
