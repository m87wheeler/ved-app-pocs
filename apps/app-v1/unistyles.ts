import { StyleSheet } from "react-native-unistyles";
import { breakpoints } from "./libs/unistyles/breakpoints";
import { darkTheme, lightTheme, baseTheme } from "./libs/unistyles/themes";

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes {
    light: typeof baseTheme;
    dark: typeof baseTheme;
  }
}

type AppThemes = typeof appThemes;
type AppBreakpoints = typeof breakpoints;

const appThemes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

StyleSheet.configure({
  settings: {
    initialTheme: "light",
  },
  themes: appThemes,
  breakpoints,
});
