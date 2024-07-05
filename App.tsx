import React, { useState, useEffect, useCallback } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ImmersiveMode from "react-native-immersive-mode";
import CustomSplashScreen from "./components/CustomSplashScreen";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppNavigator from "./navigation/AppNavigation";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    ImmersiveMode.fullLayout(true);
    ImmersiveMode.setBarMode("FullSticky");
    return () => {
      ImmersiveMode.fullLayout(false);
    };
  }, []);

  const [fontsLoaded] = useFonts({
    "SF-thin": require("./assets/fonts/SF-Pro-Display-Thin.otf"),
    "SF-regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
    "SF-semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  });

  const onLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded || !fontsLoaded) {
    return <CustomSplashScreen onLoaded={onLoaded} />;
  }

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <ThemeProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <AppNavigator />
          </GestureHandlerRootView>
        </ThemeProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
