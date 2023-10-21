import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const USERNAME_KEY = "UserName";
const IS_LOGGED_IN_KEY = "IsLoggedIn";
const USERID_KEY = "UserId";

export const saveCredentials = async (username, userid) => {
  try {
    await AsyncStorage.setItem(USERNAME_KEY, JSON.stringify(username));
    await AsyncStorage.setItem(USERID_KEY, JSON.stringify(userid));
    await AsyncStorage.setItem(IS_LOGGED_IN_KEY, JSON.stringify(true));
  } catch (error) {
    console.error("Error saving credentials:", error);
  }
};

export const getUsername = async () => {
  try {
    const value = await AsyncStorage.getItem(USERNAME_KEY);
    if (value !== null) {
      return value;
    } else {
      return "";
    }
  } catch (error) {
    console.error("Error getting username:", error);
  }
};
export let getUserId = async () => {
  try {
    return await AsyncStorage.getItem(USERID_KEY);
  } catch (error) {
    console.error("Error getting User ID:", error);
  }
};
export const getUserLoggedIn = async () => {
  try {
    return await AsyncStorage.getItem(IS_LOGGED_IN_KEY);
  } catch (error) {
    console.error("Error getting User ID:", error);
  }
};
export const removeCredentials = async () => {
  try {
    // await AsyncStorage.removeItem(USERNAME_KEY);
    // await AsyncStorage.removeItem(USERID_KEY);
    // await AsyncStorage.removeItem(IS_LOGGED_IN_KEY);

    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error removing credentials:", error);
  }
};
