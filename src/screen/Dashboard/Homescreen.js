import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Dashboard from "./Dashboard";
import constants from "../../constants";
import Component from "../../Component";
import { Entypo } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [isBottomSheetOpened, setBottomSheetOpended] = useState(true);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constants.colors.primary}
      />
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <Component.AppHeader
          headerTitle="Dashboard"
          isRightIconVisible={true}
          isLeftIconVisible={true}
        />
        <Dashboard
          setBottomSheetOpended={(value) => {
            setBottomSheetOpended(value);
          }}
        />
        {isBottomSheetOpened && (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: 40,
              right: 20,
              backgroundColor: constants.colors.primary,
              borderRadius: 20,
              padding: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
              elevation: 2,
            }}
            onPress={() => {
              navigation.navigate("CreatPost");
            }}
          >
            <Entypo name={"camera"} size={22} color={"white"} />
            <Text
              style={{
                color: constants.colors.white,
                fontWeight: 700,
                marginLeft: 5,
              }}
            >
              Add Post
            </Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </>
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
