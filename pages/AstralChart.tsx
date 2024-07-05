// src/pages/AstralChart.tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import CardBackground from "../components/CardBackground";
import { useCardStyles } from "../styles/CardStyles";
import { fetchAstroCharts } from "../services/astroChartService";
import { useAuth } from "../context/AuthContext";
import { AstroChart as AstroChartType } from "../interfaces/astrochart";
import useRefresh from "../hooks/useRefresh";

interface AstralChartProps {
  setShowAstralChart: (show: boolean) => void;
}

const AstralChart: React.FC<AstralChartProps> = ({ setShowAstralChart }) => {
  const translateY = useSharedValue(800); // Valor inicial fuera de la pantalla
  const styles = useCardStyles();
  const { user } = useAuth();
  const [astroCharts, setAstroCharts] = useState<AstroChartType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchCharts = useCallback(async () => {
    try {
      if (user?._id) {
        setLoading(true);
        const { list } = await fetchAstroCharts(user._id, page, 10);
        setAstroCharts((prev) => [...prev, ...list]);
        setLoading(false);
      }
    } catch (e) {
      console.error("Failed to fetch astro charts:", e);
      setError("Failed to load astro charts.");
      setLoading(false);
    }
  }, [user, page]);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 200 }); // Animar hacia arriba al montar el componente
    fetchCharts();
  }, [translateY, fetchCharts]);

  const closeAstralChart = () => {
    "worklet";
    translateY.value = withTiming(800, { duration: 200 }, () => {
      runOnJS(setShowAstralChart)(false); // Ocultar el componente al finalizar la animación
    });
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const { refreshing, handleRefresh } = useRefresh(fetchCharts);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <CardBackground cornerRadius={20} />
      <View style={styles.header}>
        <TouchableOpacity onPress={closeAstralChart}>
          <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.textTitle}>Astral Chart</Text>
        <ScrollView
          onScrollEndDrag={loadMore}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          {error ? (
            <Text style={styles.text}>{error}</Text>
          ) : (
            astroCharts.map((chart) => (
              <View key={chart._id} style={styles.chartItem}>
                <Text style={styles.text}>
                  Date of Birth: {chart.dateOfBirth}
                </Text>
                <Text style={styles.text}>
                  Time of Birth: {chart.timeOfBirth}
                </Text>
                <Text style={styles.text}>
                  Place of Birth: {chart.placeOfBirth}
                </Text>
              </View>
            ))
          )}
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          <View style={styles.scrollBottomSpacer} />
        </ScrollView>
      </View>
    </Animated.View>
  );
};

export default AstralChart;
