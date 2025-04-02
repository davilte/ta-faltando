import '../global.css';
import { useEffect } from "react";
import { Stack, useRouter } from 'expo-router';
import { useAuthStore, useAuthInit } from "~/store/auth";
import { useFonts, Caveat_400Regular } from '@expo-google-fonts/caveat';
import * as SplashScreen from 'expo-splash-screen';

export default function Layout() {
  useAuthInit();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const [fontsLoaded] = useFonts({
    Caveat_400Regular,
  });

  useEffect(() => {
    // Prevent the splash screen from auto-hiding
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hide the splash screen when fonts are loaded
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded) {
      if (!isAuthenticated) {
        router.replace("/login");
      } else {
        router.replace("/");
      }
    }
  }, [isAuthenticated, fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Render nothing while fonts are loading
  }

  return <Stack />;
}
