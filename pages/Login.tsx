// screens/Login.tsx
import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import { login as loginService } from "../services/authService";
import { RootStackParamList } from "../interfaces/types";
import { useAuth } from "../context/AuthContext";
import authStyles from "../styles/authStyles";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleSubmit = async () => {
    try {
      const response = await loginService(email, password);
      const { access_token } = response;
      await login(access_token); // Nota el 'await'
      navigation.navigate("MainContent");
    } catch (error) {
      console.error("Error logging in:", error);
      Toast.show({
        type: "error",
        text1: "Login Error",
        text2: "Failed to login. Please check your credentials and try again.",
      });
    }
  };

  return (
    <View style={authStyles.container}>
      <Image
        source={require("../assets/logotipo-astro.png")}
        style={authStyles.logo}
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        containerStyle={authStyles.input}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={authStyles.input}
      />

      <Button
        onPress={handleSubmit}
        title="Login"
        titleStyle={{ fontWeight: "700" }}
        buttonStyle={{
          backgroundColor: "rgba(90, 154, 230, 1)",
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
      />

      <Text
        style={authStyles.link}
        onPress={() => navigation.navigate("Register")}
      >
        Don't have an account? Register here
      </Text>
    </View>
  );
};

export default Login;
