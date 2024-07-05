// src/pages/Compatibility.tsx
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
import { getCompatibilitiesBySign } from "../services/compatibilityService";
import { useAuth } from "../context/AuthContext";
import { Compatibility as CompatibilityType } from "../interfaces/compatibility";
import useRefresh from "../hooks/useRefresh";

interface CompatibilityProps {
  setShowCompatibility: (show: boolean) => void;
}

const Compatibility: React.FC<CompatibilityProps> = ({
  setShowCompatibility,
}) => {
  const translateY = useSharedValue(800); // Valor inicial fuera de la pantalla
  const styles = useCardStyles();
  const { user } = useAuth();
  const [compatibilities, setCompatibilities] = useState<CompatibilityType[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchCompatibilities = useCallback(async () => {
    try {
      if (user?.zodiacSignCode) {
        setLoading(true);
        const { list } = await getCompatibilitiesBySign(
          user.zodiacSignCode,
          1,
          page * 10
        );
        setCompatibilities(list);
        setLoading(false);
      }
    } catch (e) {
      console.error("Error fetching compatibilities:", e);
      setError("Failed to load compatibilities.");
      setLoading(false);
    }
  }, [user, page]);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 200 }); // Animar hacia arriba al montar el componente
    fetchCompatibilities();
  }, [translateY, fetchCompatibilities]);

  const closeCompatibility = () => {
    "worklet";
    translateY.value = withTiming(800, { duration: 200 }, () => {
      runOnJS(setShowCompatibility)(false); // Ocultar el componente al finalizar la animación
    });
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const { refreshing, handleRefresh } = useRefresh(fetchCompatibilities);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <CardBackground cornerRadius={20} />
      <View style={styles.header}>
        <TouchableOpacity onPress={closeCompatibility}>
          <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.textTitle}>Compatibility</Text>
        <ScrollView
          onScrollEndDrag={loadMore}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          {error ? (
            <Text style={styles.text}>{error}</Text>
          ) : (
            compatibilities.map((compatibility) => (
              <View key={compatibility._id} style={styles.compatibilityItem}>
                <Text style={styles.text}>Sign 1: {compatibility.sign1}</Text>
                <Text style={styles.text}>Sign 2: {compatibility.sign2}</Text>
                <Text style={styles.text}>Love: {compatibility.love}</Text>
                <Text style={styles.text}>
                  Friendship: {compatibility.friendship}
                </Text>
                <Text style={styles.text}>
                  Business: {compatibility.business}
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

export default Compatibility;
