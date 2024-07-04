import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { Canvas, Circle, Shadow } from "@shopify/react-native-skia";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ProfileButtonProps {
  iconColor: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ iconColor }) => {
  const radius = 80 / 2;
  const smallerRadius = radius - 5; // Radio del círculo más pequeño

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
  };

  // Coordenadas base y desplazamiento para el efecto hover
  const baseX = 50;
  const baseY = 50;
  const hoverOffset = 2;

  // Coordenadas ajustadas según el estado de pressed
  const cx = pressed ? baseX + hoverOffset : baseX;
  const cy = pressed ? baseY + hoverOffset : baseY;

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
        <Canvas style={styles.canvas}>
          <Circle cx={cx} cy={cy} r={radius} color={"#0d0d0d"}>
            {!pressed && (
              <>
                <Shadow
                  inner
                  dx={-0.3}
                  dy={0.3}
                  blur={2}
                  color={"rgba(255,255,255,0.3)"}
                />
                <Shadow dx={-0.3} dy={0.3} blur={2} color={"#000"} />
                <Shadow dx={-0.3} dy={0.3} blur={7} color={"rgba(0,0,0,0.5)"} />
              </>
            )}
          </Circle>
          <Circle cx={cx} cy={cy} r={smallerRadius} color={"#000"}>
            <Shadow
              inner
              dx={1}
              dy={0.3}
              blur={12}
              color={"rgba(255,255,255,0.1)"}
            />
            <Shadow dx={-0.3} dy={0.3} blur={2} color={"#000"} />
          </Circle>
        </Canvas>
        <View style={styles.iconContainer}>
          <Ionicons name="person" size={24} color={iconColor} />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  canvas: {
    position: "absolute", // Asegura que el Canvas ocupe todo el espacio del contenedor
    width: 100,
    height: 100,
  },
  iconContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Asegura que el icono esté por encima del Canvas
  },
});

export default ProfileButton;
