import { Oswald_400Regular, useFonts } from "@expo-google-fonts/oswald";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export function useLoadFonts() {
  const [loaded, error] = useFonts({
    Oswald_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return { loaded, error };
}
