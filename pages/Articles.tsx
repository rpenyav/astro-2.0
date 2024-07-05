// src/pages/Articles.tsx
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Image,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import CardBackground from "../components/CardBackground";
import { useCardStyles } from "../styles/CardStyles";
import { fetchContents } from "../services/contentService";
import { Content } from "../interfaces/content";
import useRefresh from "../hooks/useRefresh";

interface ArticlesProps {
  setShowArticles: (show: boolean) => void;
}

const Articles: React.FC<ArticlesProps> = ({ setShowArticles }) => {
  const translateY = useSharedValue(800); // Valor inicial fuera de la pantalla
  const styles = useCardStyles();
  const [articles, setArticles] = useState<Content[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const { list } = await fetchContents(page, 10);
      setArticles((prev) => [...prev, ...list]);
      setLoading(false);
    } catch (e) {
      console.error("Error fetching articles:", e);
      setError("Failed to load articles.");
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 200 }); // Animar hacia arriba al montar el componente
    fetchArticles();
  }, [translateY, fetchArticles]);

  const closeArticles = () => {
    "worklet";
    translateY.value = withTiming(800, { duration: 200 }, () => {
      runOnJS(setShowArticles)(false); // Ocultar el componente al finalizar la animación
    });
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const { refreshing, handleRefresh } = useRefresh(fetchArticles);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <CardBackground cornerRadius={20} />
      <View style={styles.header}>
        <TouchableOpacity onPress={closeArticles}>
          <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.textTitle}>Articles</Text>
        <ScrollView
          onScrollEndDrag={loadMore}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          {error ? (
            <Text style={styles.text}>{error}</Text>
          ) : (
            articles.map((article) => (
              <View key={article._id} style={styles.articleItem}>
                {article.imatge && (
                  <Image
                    source={{ uri: article.imatge }}
                    style={styles.articleImage}
                  />
                )}
                <Text style={styles.text}>{article.title}</Text>
                <Text style={styles.text}>{article.body}</Text>
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

export default Articles;
