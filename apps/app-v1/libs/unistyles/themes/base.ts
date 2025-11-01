const spaceValues = {
  none: 0,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

const fontSizes = {
  xs: 10,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  _2xl: 30,
  _3xl: 36,
  _4xl: 48,
  _5xl: 60,
};

const scales = { none: 1, heading: 1.2, body: 1.5 } as const;

const lineHeights = Object.fromEntries(
  Object.entries(fontSizes).map(([key, size]) => [
    key,
    Object.fromEntries(
      Object.entries(scales).map(([k, v]) => [k, Math.round(size * v)])
    ),
  ])
) as {
  [K in keyof typeof fontSizes]: { [S in keyof typeof scales]: number };
};

export const baseTheme = {
  // Colors
  colors: {
    brand: {
      primary: "#e10a0a",
      light: "#ff3b3b",
      dark: "#b00808",
    },
    text: {
      primary: "#131313",
      onBrand: "#ffffff",
      muted: "#555555",
    },
    background: {
      base: "#ffffff",
      subtle: "#f8f8f8",
      brand: "#e10a0a",
    },
    border: {
      subtle: "#e0e0e0",
      strong: "#cccccc",
    },
  },

  // Typography
  fontFamily: {
    heading: "Oswald_400Regular",
    body: "Oswald_400Regular",
  },
  fontSize: fontSizes,
  lineHeight: lineHeights,
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Spacing
  gap: spaceValues,
  radius: spaceValues,
  padding: spaceValues,
  margin: spaceValues,

  // Borders and Shadows
  border: {
    sm: 1,
    md: 2,
    lg: 4,
  },

  shadows: {
    // iOS shadow
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1, // Android equivalent
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 6,
    },
  },
} as const;

export type Theme = typeof baseTheme;

function getLineHeightsForFontSize(key: keyof typeof fontSizes) {
  const size = fontSizes[key];
  const scale = { none: 1, heading: 1.2, body: 1.5 } as const;
  return Object.fromEntries(
    Object.entries(scale).map(([k, v]) => [k, Math.round(size * v)])
  ) as Record<keyof typeof scale, number>;
}
