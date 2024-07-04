import React from "react";
import { StyleSheet } from "react-native";
import {
  Canvas,
  LinearGradient,
  Path,
  Rect,
  Skia,
  Paint,
  vec,
} from "@shopify/react-native-skia";
import useApplicationDimensions from "../hooks/useApplicationDimensions";

const HomeBackground = () => {
  const dimensions = useApplicationDimensions();
  const { width, height } = dimensions;

  // Define el path para el triángulo diagonal
  const trianglePath = Skia.Path.Make();
  trianglePath.moveTo(0, 0); // Punto superior izquierdo
  trianglePath.lineTo(width + 40, 0); // Punto superior derecho
  trianglePath.lineTo(0, height); // Punto inferior izquierdo
  trianglePath.close(); // Cierra el path del triángulo

  return (
    <Canvas style={styles.background}>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(width, height)}
          colors={["#0E0F10", "#0d0d0d", "#0d0d0d"]}
        />
      </Rect>
      <Path path={trianglePath}>
        <Paint>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={["#0d0d0d", "#0d0d0d", "#0e1217"]}
          />
        </Paint>
      </Path>
    </Canvas>
  );
};

export default HomeBackground;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#000",
    ...StyleSheet.absoluteFillObject,
  },
});
