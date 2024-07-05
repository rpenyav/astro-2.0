import React from "react";
import { View, StyleSheet } from "react-native";
import { Canvas, Path, Skia, Shadow } from "@shopify/react-native-skia";
import useApplicationDimensions from "../hooks/useApplicationDimensions";
import FloatingCenterIcons from "./FloatingCenterIcons";
import FloatingCenterButton from "./FloatingCenterButton";

interface BottomNavigationProps {
  setShowPredictions: (value: boolean) => void;
  setShowCompatibility: (value: boolean) => void;
  setShowAstralChart: (value: boolean) => void;
  setShowArticles: (value: boolean) => void;
  setShowProfile: (value: boolean) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  setShowPredictions,
  setShowCompatibility,
  setShowAstralChart,
  setShowArticles,
  setShowProfile,
}) => {
  const dimensions = useApplicationDimensions();
  const { width } = dimensions;
  const bottomNavHeight = 120; // Altura de la barra de navegación
  const topMargin = 20; // Margen superior para el Path

  const closeAllPages = () => {
    setShowPredictions(false);
    setShowCompatibility(false);
    setShowAstralChart(false);
    setShowArticles(false);
    setShowProfile(false);
  };

  const handlePress = (openPage: () => void) => {
    closeAllPages();
    openPage();
  };

  const path = Skia.Path.Make();
  path.moveTo(0, 30); // No cambiar este punto, es el inicio del path
  path.lineTo(16.3492, 12.94);
  path.cubicTo(24.2708, 4.67391, 35.2237, 0, 46.6727, 0);
  path.lineTo(124.328, 0);
  path.cubicTo(132.903, 0, 141.273, 2.62492, 148.313, 7.52198);
  path.lineTo(169.302, 22.1232);
  path.cubicTo(184.749, 32.8689, 205.251, 32.8689, 220.698, 22.1232);
  path.lineTo(241.687, 7.52198);
  path.cubicTo(248.727, 2.62491, 257.097, 0, 265.672, 0);
  path.lineTo(343.327, 0);
  path.cubicTo(354.776, 0, 365.729, 4.67391, 373.651, 12.94);
  path.lineTo(width, 30); // No cambiar este punto, es el final de la curva superior
  path.lineTo(width, bottomNavHeight); // Cambiar la altura aquí a bottomNavHeight
  path.lineTo(0, bottomNavHeight); // Cambiar la altura aquí a bottomNavHeight
  path.close();

  return (
    <View style={[styles.container, { height: bottomNavHeight + topMargin }]}>
      <Canvas style={{ width: width, height: bottomNavHeight + topMargin }}>
        <Path
          path={path}
          color="#000000"
          transform={[{ translateY: topMargin }]}
        >
          <Shadow
            inner
            dx={0}
            dy={1}
            blur={0.2}
            color={"rgba(171, 168, 168, 0.3)"}
          />
        </Path>
      </Canvas>
      <View style={styles.iconsContainer}>
        <FloatingCenterIcons
          icon="planet"
          iconColor={"rgba(255,255,255,0.4)"}
          onPress={() => handlePress(() => setShowPredictions(true))}
        />
        <FloatingCenterIcons
          icon="people-sharp"
          iconColor={"rgba(255,255,255,0.4)"}
          onPress={() => handlePress(() => setShowCompatibility(true))}
        />
        <FloatingCenterIcons
          icon="pie-chart"
          iconColor={"rgba(255,255,255,0.4)"}
          onPress={() => handlePress(() => setShowAstralChart(true))}
        />
        <FloatingCenterIcons
          icon="reader"
          iconColor={"rgba(255,255,255,0.4)"}
          onPress={() => handlePress(() => setShowArticles(true))}
        />
      </View>
      <FloatingCenterButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 3, // Asegurar que BottomNavigation tenga el zIndex mayor
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 0,
    position: "absolute",
    bottom: 30, // Ajustamos la posición en la parte inferior de la vista
    left: 0,
    right: 0,
  },
});

export default BottomNavigation;
