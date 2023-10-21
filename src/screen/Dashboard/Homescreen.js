import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Dashboard from "./Dashboard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Dashboard />
      {/* <Text>This is Home Screen ...!!!!</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
