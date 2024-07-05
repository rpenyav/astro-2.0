import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";
import { useCardStyles } from "../styles/CardStyles";
import CardBackground from "../components/CardBackground";
import { darkTheme } from "../themes/themes";
import { useAuth } from "../context/AuthContext";

interface ProfileProps {
  setShowProfile: (show: boolean) => void;
}

const Profile: React.FC<ProfileProps> = ({ setShowProfile }) => {
  const translateY = useSharedValue(800); // Valor inicial fuera de la pantalla
  const { theme, toggleTheme } = useTheme();
  const styles = useCardStyles();
  const { user, logout } = useAuth();

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 200 }); // Animar hacia arriba al montar el componente
  }, [translateY]);

  const closeProfile = () => {
    "worklet";
    translateY.value = withTiming(800, { duration: 200 }, () => {
      runOnJS(setShowProfile)(false); // Ocultar el componente al finalizar la animación
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.containerProfile, animatedStyle]}>
      <CardBackground cornerRadius={20} />
      <View style={styles.header}>
        <TouchableOpacity onPress={closeProfile}>
          <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.textTitle}>Profile</Text>
        <Text style={styles.text}>
          {user?.email} - {user?.name}
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        >
          <Text style={styles.text}>Toggle Theme</Text>
          <Switch value={theme === darkTheme} onValueChange={toggleTheme} />
        </View>
      </View>
    </Animated.View>
  );
};

export default Profile;
