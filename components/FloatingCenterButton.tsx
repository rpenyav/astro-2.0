import React from "react";
import { View, StyleSheet } from "react-native";
import { Canvas, Circle, Line, Shadow } from "@shopify/react-native-skia";
import useApplicationDimensions from "../hooks/useApplicationDimensions";

export default function FloatingCenterButton() {
  const dimensions = useApplicationDimensions();
  const { width } = dimensions;
  const circleDiameter = 70;
  const circleRadius = circleDiameter / 2;

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
          <Line
            strokeCap={"round"}
            p1={{ x: circleRadius - 15, y: circleRadius }}
            p2={{ x: circleRadius + 15, y: circleRadius }}
            color="white"
            strokeWidth={4}
          />
          <Line
            strokeCap={"round"}
            p1={{ x: circleRadius, y: circleRadius - 15 }}
            p2={{ x: circleRadius, y: circleRadius + 15 }}
            color="white"
            strokeWidth={4}
          />
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
