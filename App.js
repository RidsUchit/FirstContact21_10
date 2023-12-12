import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { enableScreens } from "react-native-screens";

import Login from "./src/screen/login/Login";
import HomeTabs from "./HomeTabs";

import { Alert } from "react-native";
import { AppContext } from "./src/Context/appContext";

import { foregroundHandler } from "./src/utils/notification";
import notifee, { EventType } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";

const Stack = createStackNavigator();
const AiuthStack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //here set the fcm token;
  const [contextState, setContextState] = useState({
    FCMToken: "",
    authToken: "",
    userId: "",
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

    if (Platform.OS == "android") {
      (async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          // Handle the case where the user denies notification permissions
          console.log("Notification permissions denied");
        } else {
          // Permission granted, you can now send and receive notifications
          console.log("Notification permissions granted");
        }
      })();
    }

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

    const foregroundUnsubscribe = notifee.onForegroundEvent(
      ({ type, detail }) => {
        switch (type) {
          case EventType.DISMISSED:
            break;
          case EventType.PRESS:
            // notificationHandler(detail.notification);
            break;
        }
      }
    );

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      foregroundHandler(remoteMessage);
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      // notification handler
    });

    messaging()
      .getInitialNotification()
      .then((message) => {
        // notification handler
      });

    return () => {
      unsubscribe();
      foregroundUnsubscribe();
    };
  }, []);

  return (
    <AppContext.Provider value={{ contextState, setContextState }}>
      <NavigationContainer>
        {contextState?.authToken ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
          </Stack.Navigator>
        ) : (
          <AiuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AiuthStack.Screen name="Login" component={Login} />
          </AiuthStack.Navigator>
        )}
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default App;
