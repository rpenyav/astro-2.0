import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Canvas,
  Circle,
  ImageSVG,
  useSVG,
  Shadow,
} from "@shopify/react-native-skia";

import useApplicationDimensions from "../hooks/useApplicationDimensions";
import { useAuth } from "../context/AuthContext";
import { zodiacSignSVGs } from "../constants/zodiacSignSVGs";

export default function FloatingCenterButton() {
  const { user } = useAuth();
  const dimensions = useApplicationDimensions();
  const { width } = dimensions;
  const circleDiameter = 70;
  const circleRadius = circleDiameter / 2;

  const zodiacSignCode = user?.zodiacSignCode || "logotipo";
  const svg = useSVG(zodiacSignSVGs[zodiacSignCode]);

  return (
    <View style={styles.container}>
      <View style={{ width: circleDiameter, height: circleDiameter }}>
        <Canvas style={{ flex: 1 }}>
          <Circle
            cx={circleRadius}
            cy={circleRadius}
            r={circleRadius}
            color="black"
          >
            <Shadow
              inner
              dx={0.5}
              dy={2}
              blur={2}
              color={"rgba(171, 168, 168, 0.4)"}
            />
          </Circle>
          {svg && (
            <ImageSVG
              svg={svg}
              x={(circleDiameter - 60) / 2} // Center the SVG horizontally
              y={(circleDiameter - 70) / 2} // Center the SVG vertically
              width={60}
              height={60}
            />
          )}
        </Canvas>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 110,
    left: "50%",
    transform: [{ translateX: -35 }],
  },
});
