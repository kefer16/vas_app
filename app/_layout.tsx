import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
   DarkTheme,
   DefaultTheme,
   ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { SesionProvider } from "@/contexts/Sesion.context";

export {
   // Catch any errors thrown by the Layout component.
   ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
   // Ensure that reloading on `/modal` keeps a back button present.
   initialRouteName: "(home)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
   const [loaded, error] = useFonts({
      Poppins300: require("../assets/fonts/Poppins-Light.ttf"),
      Poppins400: require("../assets/fonts/Poppins-Regular.ttf"),
      Poppins500: require("../assets/fonts/Poppins-Medium.ttf"),
      Poppins600: require("../assets/fonts/Poppins-SemiBold.ttf"),
      Poppins700: require("../assets/fonts/Poppins-Bold.ttf"),
      Poppins800: require("../assets/fonts/Poppins-ExtraBold.ttf"),
      Poppins900: require("../assets/fonts/Poppins-Black.ttf"),
      ...FontAwesome.font,
   });

   // Expo Router uses Error Boundaries to catch errors in the navigation tree.
   useEffect(() => {
      if (error) throw error;
   }, [error]);

   useEffect(() => {
      if (loaded) {
         SplashScreen.hideAsync();
      }
   }, [loaded]);

   if (!loaded) {
      return null;
   }

   return <RootLayoutNav />;
}

function RootLayoutNav() {
   const colorScheme = useColorScheme();

   return (
      <SesionProvider>
         <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
         >
            <Stack>
               <Stack.Screen name="index" options={{ headerShown: false }} />
               <Stack.Screen name="register" options={{ headerShown: false }} />
               <Stack.Screen name="(home)" options={{ headerShown: false }} />
            </Stack>
         </ThemeProvider>
      </SesionProvider>
   );
}
