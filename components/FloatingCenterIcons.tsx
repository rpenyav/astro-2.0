import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface FloatingCenterIconsProps {
  icon: any;
  iconColor: string;
  onPress?: () => void; // Añadir onPress como prop opcional
}

const FloatingCenterIcons: React.FC<FloatingCenterIconsProps> = ({
  icon = "earth",
  iconColor,
  onPress,
}) => {
  const [scaleAnim] = useState(new Animated.Value(1));
  const [pressed, setPressed] = useState(false); // Estado para manejar la presión

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 1.2,
      duration: 150,
      useNativeDriver: true,
    }).start();
    setPressed(true); // Establecer estado de presión a verdadero
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
    setPressed(false); // Establecer estado de presión a falso
    if (onPress) {
      onPress(); // Llamar a onPress si está definido
    }
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={28} color={iconColor} />
          {pressed && <View style={styles.shadowContainer} />}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Sombra en Android
  },
  iconContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  shadowContainer: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: "100%",
    height: "100%",
    borderRadius: 30,
    top: 0,
    left: 0,
    zIndex: -1,
    elevation: 6,
  },
});

export default FloatingCenterIcons;
