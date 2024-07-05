import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Canvas,
  LinearGradient,
  Path,
  RoundedRect,
  vec,
  Shadow,
} from "@shopify/react-native-skia";
import useApplicationDimensions from "../hooks/useApplicationDimensions";
import { useTheme } from "../context/ThemeContext";

interface CardBackgroundProps {
  cornerRadius: number;
}

const CardBackground: React.FC<CardBackgroundProps> = ({ cornerRadius }) => {
  const { width, height } = useApplicationDimensions();
  const { theme } = useTheme();

  const borderPath = `M 0 ${cornerRadius} 
    A ${cornerRadius} ${cornerRadius} 0 0 1 ${cornerRadius} 0
    H ${width - cornerRadius}
    A ${cornerRadius} ${cornerRadius} 0 0 1 ${width} ${cornerRadius}
  `;

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        borderRadius: cornerRadius,
        overflow: "hidden",
      }}
    >
      <Canvas style={{ flex: 1 }}>
        <RoundedRect r={cornerRadius} x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={[
              theme.cardBackground.gradientStart,
              theme.cardBackground.gradientEnd,
            ]}
            positions={[-0.04, 0.95]}
          />
          <Shadow
            inner
            dx={5}
            dy={5}
            blur={4}
            color={theme.cardBackground.shadowColorInner}
          />
          <Shadow
            inner
            dx={-4}
            dy={-4}
            blur={2}
            color={theme.cardBackground.shadowColorOuter}
          />
        </RoundedRect>
        <Path
          path={borderPath}
          style="stroke"
          strokeWidth={2}
          color={theme.cardBackground.borderColor}
        >
          <LinearGradient
            start={vec(width / 2, 0)}
            end={vec(width / 2, cornerRadius)}
            colors={["white", "transparent"]}
          />
        </Path>
      </Canvas>
    </View>
  );
};

export default CardBackground;
