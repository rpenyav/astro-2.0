import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../context/AuthContext";
import LoginScreen from "../pages/Login";
import MainContent from "../pages/MainContext";
import RegisterScreen from "../pages/Register";

const Stack = createStackNavigator();

const AuthStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const MainStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MainContent"
      component={MainContent}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const AppNavigator: React.FC = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
