import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./src/screen/Dashboard/Homescreen";
import EventScreen from "./src/screen/Events/EventScreen";
import RewardScreen from "./src/screen/Rewards/RewardScreen";

import JobScreen from "./src/screen/Jobs/JobScreen";
import JobDetailScreen from "./src/screen/Jobs/JobDetailScreen";
import JobApplyScreen from "./src/screen/Jobs/JobApplyScreen";

import ProfileScreen from "./src/screen/Profile/ProfileScreen";
import BroadcastScreen from "./src/screen/Broadcast/BroadcastScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "./src/Context/appContext";

const Tab = createBottomTabNavigator();

const LogoutButton = ({ navigation }) => {
  //const navigation = useNavigation();
  const { contextState, setContextState } = useContext(AppContext);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("UserName");
      await AsyncStorage.removeItem("UserId");
      await AsyncStorage.removeItem("IsLoggedIn");

      setContextState({
        ...contextState,
        authToken: "",
      });
    } catch (error) {
      console.log("Error logging out:", error.message);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        handleLogout();
      }}
    >
      <AntDesign
        name="logout"
        size={24}
        style={{ paddingRight: 10 }}
        color="#5A5A5A"
      />
    </TouchableOpacity>
  );
};
const JobStack = createStackNavigator();
const JobStackScreen = () => (
  <JobStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <JobStack.Screen name="Job" component={JobScreen} />
    <JobStack.Screen name="JobDetail" component={JobDetailScreen} />
    <JobStack.Screen name="JobApply" component={JobApplyScreen} />
  </JobStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
    <ProfileStack.Screen name="Broadcast" component={BroadcastScreen} />
  </ProfileStack.Navigator>
);

const HomeTabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        //headerShown: false,
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "grey",
        headerRight: () => <LogoutButton navigation={navigation} />,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Event") {
            iconName = focused ? "calendar" : "calendar-sharp";
          } else if (route.name === "Rewards") {
            iconName = focused ? "trophy" : "trophy-outline";
          } else if (route.name === "Jobs") {
            iconName = focused ? "desktop" : "desktop-sharp";
          } else if (route.name === "Profile") {
            iconName = focused
              ? "ios-person-circle"
              : "ios-person-circle-outline";
          }
          <Ionicons name="" size={24} color="black" />;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Event" component={EventScreen} />
      <Tab.Screen name="Rewards" component={RewardScreen} />
      <Tab.Screen
        name="Jobs"
        component={JobStackScreen}
        navigation={navigation}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        navigation={navigation}
      />
    </Tab.Navigator>
  );
};
export default HomeTabs;
