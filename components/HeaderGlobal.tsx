import React from "react";
import ProfileButton from "./ProfileButton";
import { StyleSheet, View, Text } from "react-native";
import { Canvas, ImageSVG, useSVG } from "@shopify/react-native-skia";

interface HeaderGlobalProps {
  setShowProfile: (value: boolean) => void;
}

const HeaderGlobal: React.FC<HeaderGlobalProps> = ({ setShowProfile }) => {
  const svg = useSVG(require("../assets/logotipo.svg"));

  return (
    <View style={styles.profileContainer}>
      <View style={styles.imageContainer}>
        <Canvas style={styles.canvas}>
          {svg && <ImageSVG svg={svg} width={50} height={50} />}
        </Canvas>
        <Text style={styles.text}>Astro Predictions</Text>
      </View>
      <View style={styles.profileButtonContainer}>
        <ProfileButton
          iconColor={"rgba(255,255,255,0.4)"}
          setShowProfile={setShowProfile}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    justifyContent: "space-between",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  profileButtonContainer: {
    flex: 1,
    marginRight: 25,
  },
  imageContainer: {
    flexDirection: "column", // Alinear elementos en fila
    alignItems: "flex-start", // Alinear elementos verticalmente en el centro
    flex: 2,
    paddingLeft: 30,
  },
  canvas: {
    width: 50,
    height: 50,
  },
  text: {
    fontFamily: "SF-semibold",
    fontSize: 17,
    color: "rgba(235,235,245,0.6)",
    marginLeft: 0, // Añadir margen para separar el texto del logo
  },
});

export default HeaderGlobal;
