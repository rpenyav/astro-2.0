import React, { useState, useEffect, useCallback } from "react";
import { StatusBar, View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ImmersiveMode from "react-native-immersive-mode";
import CustomSplashScreen from "./components/CustomSplashScreen";
import BottomNavigation from "./components/BottomNavigation";
import HomeBackground from "./components/HomeBackground";
import HeaderGlobal from "./components/HeaderGlobal";

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
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <View style={styles.container}>
          <HeaderGlobal />
          <View style={styles.contentContainer}>
            <HomeBackground />
            <BottomNavigation />
          </View>
        </View>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
  },
});
