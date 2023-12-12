import React, { useState, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";

import logo from "../../../assets/logo_fc.png";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mainContainer } from "../../CommonCss/BaseCss";
import {
  logoCss,
  inputView,
  inputText,
  loginButton,
  loginButtonText,
  loginButtonSkip,
} from "./LoginCss";
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import { AppContext } from "../../Context/appContext";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { contextState, setContextState } = useContext(AppContext);

  const handleLogin = async () => {
    if (username == "" || password == "") {
      Alert.alert("First Contact", "Please enter vaild Username and Password.");
      return;
    } else {
      setIsLoading(true);
      try {
        // Send login request to the backend server
        const response = await axios.post(
          "https://fcbackapi.netlify.app/.netlify/functions/api/login",
          {
            username: username,
            password: password,
            devicetoken: contextState?.FCMToken,
            deviceType: Platform.OS == "ios" ? "ios" : "android",
          }
        );
        console.log("auth error==> response ", response);
        setIsLoading(false);
        if (response.status === 200) {
          await AsyncStorage.setItem("IsLoggedIn", JSON.stringify(true));
          await AsyncStorage.setItem(
            "UserId",
            JSON.stringify(response.data.UserId)
          );
          await AsyncStorage.setItem("UserName", JSON.stringify(username));
          // Redirect to the Home screen after successful login

          // Register the device with FCM

          // navigation.navigate("HomeTabs");
          setContextState({
            ...contextState,
            authToken: true,
            userId: response.data.UserId,
          });
        } else {
          // Server returned an unexpected response
          Alert.alert("Error", "An error occurred during login.");
        }
      } catch (error) {
        setIsLoading(false);

        // Error occurred during the HTTP request or server returned an error
        console.log("auth error==>", error);
        Alert.alert("First Contact", "Something went wrong, Please try again.");

        // if (error.response && error.response.status === 401) {
        //   Alert.alert("Error", "Invalid credentials");
        // } else {
        //   Alert.alert("Error", "An error occurred during login.");
        // }
      }
    }
  };
  const handleSkipLogin = async () => {
    try {
      // Avoid login
      await AsyncStorage.setItem("IsLoggedIn", JSON.stringify(true));
      await AsyncStorage.setItem("UserId", JSON.stringify(1));
      await AsyncStorage.setItem("UserName", "rp@firstcontact.co");
      console.log("Login Skipped!");

      navigation.navigate("HomeTabs");
    } catch (error) {
      // Error occurred during the HTTP request or server returned an error

      Alert.alert("Error", "An error occurred during login.");
    }
  };
  return (
    <View style={mainContainer}>
      <Image style={logoCss} source={logo} />
      <View style={inputView}>
        <TextInput
          style={inputText}
          value={username}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
        />
      </View>
      <View style={inputView}>
        <TextInput
          style={inputText}
          value={password}
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity
        style={loginButton}
        onPress={() => {
          isLoading ? null : handleLogin();
        }}
      >
        {!isLoading ? (
          <Text style={loginButtonText}>Login</Text>
        ) : (
          <ActivityIndicator size="large" color="#aaa" />
        )}
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={handleSkipLogin} style={loginButtonSkip}>
        <Text style={loginButtonText}>Skip Login</Text>

      </TouchableOpacity> */}
    </View>
  );
};

export default Login;
