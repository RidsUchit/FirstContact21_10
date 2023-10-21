import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { enableScreens } from "react-native-screens";

import Login from "./src/screen/login/Login";
import HomeTabs from "./HomeTabs";
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";
import { AppContext } from "./src/Context/appContext";

const Stack = createStackNavigator();
const AiuthStack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //here set the fcm token;
  const [contextState, setContextState] = useState({
    FCMToken: "",
    authToken: "",
  });

  enableScreens(false);

  const checkLoginStatus = async () => {
    try {
      // Check if the token exists in AsyncStorage
      const token = await AsyncStorage.getItem("IsLoggedIn");
      console.log(token);
      if (token !== null) {
        setIsLoggedIn(token);
        setContextState({
          ...contextState,
          authToken: token,
        });
        console.log(await AsyncStorage.getItem("UserId"));
      }
    } catch (error) {
      console.log("Error checking login status:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Here take the Push notification permission for the iOS user
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  useEffect(() => {
    checkLoginStatus();

    // After grant the permission take the token
    // Note : messaging is only accessiable in the build so whenever run code please comment  the messaging object code
    // otherwise it gives the error

    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then((token) => {
          setContextState({
            ...contextState,
            FCMToken: token,
          });
        });
    }
  }, []);

  return (
    <AppContext.Provider value={{ contextState, setContextState }}>
      <NavigationContainer>
        {contextState?.authToken ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
          </Stack.Navigator>
        ) : (
          <AiuthStack.Navigator>
            <AiuthStack.Screen name="Login" component={Login} />
          </AiuthStack.Navigator>
        )}
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
