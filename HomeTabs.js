import React, { useContext, useState } from "react";

import { View, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
//import { createDrawerNavigator } from "@react-navigation/drawer";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "./src/Context/appContext";
import constants from "./src/constants";

import HomeScreen from "./src/screen/Dashboard/Homescreen";
import CreatPost from "./src/screen/Dashboard/PostCreate";

import EventScreen from "./src/screen/Events/EventScreen";
import RewardScreen from "./src/screen/Rewards/RewardScreen";

import JobScreen from "./src/screen/Jobs/JobScreen";
import JobDetailScreen from "./src/screen/Jobs/JobDetailScreen";
import JobApplyScreen from "./src/screen/Jobs/JobApplyScreen";

import ProfileScreen from "./src/screen/Profile/ProfileScreen";
import OtherProfile from "./src/screen/Profile/OtherProfile";
import SendNotification from "./src/screen/Notifications/SendNotification";

import ListNotification from "./src/screen/Notifications/ListNotification";
import BroadcastScreen from "./src/screen/Broadcast/BroadcastScreen";

const Tab = createBottomTabNavigator();

const LogoutButton = ({ navigation }) => {
  //const navigation = useNavigation();
  const { contextState, setContextState } = useContext(AppContext);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("UserName");
      await AsyncStorage.removeItem("UserId");
      await AsyncStorage.removeItem("IsLoggedIn");
      await AsyncStorage.removeItem("RoleId");

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
    <JobStack.Screen name="OtherProfile" component={OtherProfile} />
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
    <ProfileStack.Screen name="SendNotification" component={SendNotification} />
  </ProfileStack.Navigator>
);

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    <HomeStack.Screen name="CreatPost" component={CreatPost} />
  </HomeStack.Navigator>
);

const NotificationStack = createStackNavigator();
const NotificationStackScreen = () => (
  <NotificationStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <NotificationStack.Screen
      name="ListNotification"
      component={ListNotification}
    />
    <NotificationStack.Screen name="Broadcast" component={BroadcastScreen} />
  </NotificationStack.Navigator>
);

// const Drawer = createDrawerNavigator();
// const DrawerStack = () => {
//   return (
//     <Drawer.Navigator>
//       {/* Add your other drawer screens here */}
//       <Drawer.Screen name="Notifications" component={ListNotification} />
//       <Drawer.Screen name="Broadcast" component={BroadcastScreen} />
//     </Drawer.Navigator>
//   );
// };
const HomeTabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: constants.colors.primary,
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
          } else if (route.name === "Notifications") {
            iconName = focused
              ? "notifications-circle"
              : "notifications-circle-outline";
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
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Event" component={EventScreen} />
      <Tab.Screen name="Rewards" component={RewardScreen} />
      <Tab.Screen
        name="Jobs"
        component={JobStackScreen}
        navigation={navigation}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationStackScreen}
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
