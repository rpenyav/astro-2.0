import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Canvas, Path, Skia } from "@shopify/react-native-skia";
import {
  useSharedValue,
  useDerivedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface CustomSplashScreenProps {
  onLoaded: () => void;
}

const CustomSplashScreen: React.FC<CustomSplashScreenProps> = ({
  onLoaded,
}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    const load = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onLoaded();
    };
    load();

    progress.value = withTiming(1, {
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
    });
  }, [onLoaded]);

  const animatedPath = useDerivedValue(() => {
    const p = Skia.Path.Make();
    const maxLength = 5;
    const currentLength = progress.value * maxLength;

    p.moveTo(50, 200);
    if (currentLength > 0)
      p.lineTo(
        50 + Math.min(currentLength, 1) * 50,
        200 - Math.min(currentLength, 1) * 100
      );
    if (currentLength > 1)
      p.lineTo(
        100 + Math.min(currentLength - 1, 1) * 50,
        100 + Math.min(currentLength - 1, 1) * 100
      );
    if (currentLength > 2)
      p.lineTo(
        150 + Math.min(currentLength - 2, 1) * 50,
        200 - Math.min(currentLength - 2, 1) * 100
      );
    if (currentLength > 3)
      p.lineTo(
        200 + Math.min(currentLength - 3, 1) * 50,
        100 + Math.min(currentLength - 3, 1) * 100
      );
    if (currentLength > 4) p.lineTo(250, 200);

    return p;
  }, [progress]);

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <Path
          path={animatedPath}
          style="stroke"
          strokeWidth={5}
          color="white"
        />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  canvas: {
    width: 300,
    backgroundColor: "black",
    height: 300,
  },
});

export default CustomSplashScreen;
