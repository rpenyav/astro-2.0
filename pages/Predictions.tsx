import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import CardBackground from "../components/CardBackground";
import { useCardStyles } from "../styles/CardStyles";
import { Prediction } from "../interfaces/prediction";
import { useAuth } from "../context/AuthContext";
import { getHoroscopeBySignCode } from "../services/horoscopeService";

interface PredictionsProps {
  setShowPredictions: (show: boolean) => void;
}

const Predictions: React.FC<PredictionsProps> = ({ setShowPredictions }) => {
  const translateY = useSharedValue(800); // Valor inicial fuera de la pantalla
  const styles = useCardStyles();
  const { user } = useAuth();
  const [predictions, setPredictions] = useState<{
    daily: Prediction | null;
    weekly: Prediction | null;
    monthly: Prediction | null;
  }>({ daily: null, weekly: null, monthly: null });

  useEffect(() => {
    const fetchPredictions = async () => {
      if (user?.zodiacSignCode) {
        try {
          const result = await getHoroscopeBySignCode(user.zodiacSignCode);
          setPredictions(result);
        } catch (error) {
          // Handling error silently
        }
      }
    };

    fetchPredictions();
  }, [user?.zodiacSignCode]);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 200 }); // Animar hacia arriba al montar el componente
  }, [translateY]);

  const closePredictions = () => {
    "worklet";
    translateY.value = withTiming(800, { duration: 200 }, () => {
      runOnJS(setShowPredictions)(false); // Ocultar el componente al finalizar la animación
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <CardBackground cornerRadius={20} />
      <View style={styles.header}>
        <TouchableOpacity onPress={closePredictions}>
          <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.textTitle}>Predictions</Text>
        {predictions.daily ? (
          <View>
            <Text style={styles.textTitle}>Daily:</Text>
            <Text style={styles.text}>{predictions.daily.prediction}</Text>
          </View>
        ) : (
          <Text style={styles.text}>No daily prediction available.</Text>
        )}
        {predictions.weekly ? (
          <View>
            <Text style={styles.textTitle}>Weekly:</Text>
            <Text style={styles.text}>{predictions.weekly.prediction}</Text>
          </View>
        ) : (
          <Text style={styles.text}>No weekly prediction available.</Text>
        )}
        {predictions.monthly ? (
          <View>
            <Text style={styles.textTitle}>Monthly:</Text>
            <Text style={styles.text}>{predictions.monthly.prediction}</Text>
          </View>
        ) : (
          <Text style={styles.text}>No monthly prediction available.</Text>
        )}
      </View>
    </Animated.View>
  );
};

export default Predictions;
