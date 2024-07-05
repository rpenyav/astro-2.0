import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { lightTheme } from "../themes/themes";

interface Style {
  container: ViewStyle;
  containerProfile: ViewStyle;
  header: ViewStyle;
  closeButton: TextStyle;
  content: ViewStyle;
  textTitle: TextStyle;
  text: TextStyle;
  compatibilityItem: ViewStyle;
  prediction: TextStyle;
  chartItem: ViewStyle;
  articleItem: ViewStyle;
  articleImage: ImageStyle;

  scrollBottomSpacer: ViewStyle;
}

const createStyles = (theme: typeof lightTheme): Style => ({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 700,
    backgroundColor: theme.container.backgroundColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1,
    shadowColor: theme.container.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerProfile: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 850,
    backgroundColor: theme.containerProfile.backgroundColor,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 2,
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    width: "100%",
    padding: 10,
    alignItems: "flex-end",
    borderBottomWidth: 0,
    borderBottomColor: theme.header.borderBottomColor,
  },
  closeButton: {
    fontSize: 18,
    color: theme.closeButton.color,
    marginRight: 10,
  },
  content: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  textTitle: {
    fontSize: 24,
    marginBottom: 30,
    color: theme.text.color,
  },
  text: {
    fontSize: 16,
    color: theme.text.color,
  },
  compatibilityItem: {
    marginBottom: 10,
  },
  prediction: {
    fontSize: 16,
    color: theme.text.color,
    marginBottom: 10,
  },
  chartItem: {
    marginBottom: 10,
  },
  articleItem: {
    marginBottom: 10,
  },
  scrollBottomSpacer: {
    height: 200,
  },
  articleImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export const useCardStyles = (): Style => {
  const { theme } = useTheme();
  return createStyles(theme);
};
