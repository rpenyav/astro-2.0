import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import HeaderGlobal from "../components/HeaderGlobal";
import BottomNavigation from "../components/BottomNavigation";
import HomeBackground from "../components/HomeBackground";
import Predictions from "../pages/Predictions";
import Compatibility from "../pages/Compatibility";
import AstralChart from "../pages/AstralChart";
import Articles from "../pages/Articles";
import Profile from "../pages/Profile";

const MainContent: React.FC = () => {
  const [showPredictions, setShowPredictions] = useState(false);
  const [showCompatibility, setShowCompatibility] = useState(false);
  const [showAstralChart, setShowAstralChart] = useState(false);
  const [showArticles, setShowArticles] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleCloseAll = () => {
    setShowPredictions(false);
    setShowCompatibility(false);
    setShowAstralChart(false);
    setShowArticles(false);
    setShowProfile(false);
  };

  return (
    <View style={styles.container}>
      <HeaderGlobal setShowProfile={setShowProfile} />
      <View style={styles.contentContainer}>
        <HomeBackground />
        {showPredictions && (
          <Predictions setShowPredictions={setShowPredictions} />
        )}
        {showCompatibility && (
          <Compatibility setShowCompatibility={setShowCompatibility} />
        )}
        {showAstralChart && (
          <AstralChart setShowAstralChart={setShowAstralChart} />
        )}
        {showArticles && <Articles setShowArticles={setShowArticles} />}
      </View>
      {showProfile && <Profile setShowProfile={setShowProfile} />}
      <BottomNavigation
        setShowPredictions={setShowPredictions}
        setShowCompatibility={setShowCompatibility}
        setShowAstralChart={setShowAstralChart}
        setShowArticles={setShowArticles}
        setShowProfile={setShowProfile}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    position: "relative",
  },
});

export default MainContent;
