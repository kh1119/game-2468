export const colors = {
  dark: {
    bgStart: '#0B0F19', // Deep cosmic black
    bgEnd: '#090514',   // Deep space purple
    cardBg: 'rgba(17, 24, 39, 0.55)', // Translucent glass slate
    cardBorder: 'rgba(255, 255, 255, 0.08)',
    emptyCell: 'rgba(31, 41, 55, 0.35)', // Subtle dark holes
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
    accent: '#6366F1', // Indigo Neon
    accentLight: 'rgba(99, 102, 241, 0.15)',
    buttonBg: 'rgba(30, 41, 59, 0.6)',
    buttonBorder: 'rgba(99, 102, 241, 0.3)',
    scoreBg: 'rgba(17, 24, 39, 0.75)',
    shadow: '#000000',
  },
  light: {
    bgStart: '#F8FAFC', // Slate 50
    bgEnd: '#E2E8F0',   // Soft Blue-Gray
    cardBg: 'rgba(255, 255, 255, 0.85)',
    cardBorder: 'rgba(148, 163, 184, 0.2)',
    emptyCell: 'rgba(226, 232, 240, 0.7)',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    accent: '#4F46E5', // Deep Indigo
    accentLight: 'rgba(79, 70, 229, 0.08)',
    buttonBg: 'rgba(255, 255, 255, 0.9)',
    buttonBorder: 'rgba(79, 70, 229, 0.2)',
    scoreBg: 'rgba(255, 255, 255, 0.9)',
    shadow: '#64748B',
  }
};

// Extremely vibrant, premium candy-colored gradients for tile levels
export const tileGradients = {
  tier1: ['#38BDF8', '#0284C7'],   // Neon Sky Blue to Deep Cyan (Value: 2)
  tier2: ['#C084FC', '#7C3AED'],   // Bright Lavender to Intense Purple (Value: 4)
  tier3: ['#F472B6', '#BE185D'],   // Electric Pink to Hot Pink (Value: 8 or 6)
  tier4: ['#F87171', '#DC2626'],   // Coral to Fire Red (Value: 16 or 8)
  tier5: ['#FBBF24', '#D97706'],   // Glowing Golden Amber to Dark Orange (Value: 32 or 10)
  tier6: ['#34D399', '#059669'],   // Mint to Emerald Green (Value: 64 or 12)
  tier7: ['#22D3EE', '#0891B2'],   // Electric Cyan to Ocean Teal (Value: 128 or 14)
  tier8: ['#818CF8', '#4F46E5'],   // Indigo Blue to Royal Purple (Value: 256 or 16)
  tier9: ['#EC4899', '#8B5CF6'],   // Pink to Violet Fusion (Value: 512 or 18)
  tier10: ['#F43F5E', '#BE123C'],  // Vibrant Rose Red (Value: 1024 or 20)
  tier11: ['#FF2E93', '#FF007F'],  // Neon Magenta / Cyberpunk Pink (Value: 2048 or 22)
  tier12: ['#A3E635', '#4D7C0F'],  // Toxic Lime to Moss Green (Value: 4096 or 24)
  legendary: ['#FCD34D', '#D97706'] // Golden Sun Gradient (Higher values)
};

export const getTileTier = (value, mode) => {
  if (value <= 0) return 0;
  if (mode === 'evenSteps') {
    return Math.max(1, Math.floor(value / 2));
  } else {
    return Math.max(1, Math.round(Math.log2(value)));
  }
};

export const getTileColors = (value, mode) => {
  const tier = getTileTier(value, mode);
  if (tier === 0) return ['transparent', 'transparent'];
  if (tier > 12) return tileGradients.legendary;
  return tileGradients[`tier${tier}`] || tileGradients.legendary;
};

export const getTileTextColor = (value, mode) => {
  // Pure white works best on all intense gradients
  return '#FFFFFF';
};
