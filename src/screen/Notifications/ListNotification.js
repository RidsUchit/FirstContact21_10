import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import axios from "axios";
import Avatar from "../../../assets/avatar.png";
import { Ionicons } from "@expo/vector-icons";
import constants from "../../constants";
import Component from "../../Component";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListNotification = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications when the component mounts
    fetchNotifications();
  }, []);
  const fetchNotifications = async () => {
    try {
      const currentUserId = await AsyncStorage.getItem("UserId");
      let url = `https://fcbackapi.netlify.app/.netlify/functions/api/notificationList/${JSON.parse(
        currentUserId
      )}`;
      console.log(url);

      axios.get(url).then((response) => {
        setNotifications(response.data);
        // console.log(res.data);
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constants.colors.primary}
      />
      <SafeAreaView style={styles.container}>
        <Component.AppHeader
          headerTitle="Notification"
          isBackBtn={true}
          onPressBtn={() => {
            navigation.goBack();
          }}
        />
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.NotificationId}
          renderItem={({ item }) => (
            <View style={styles.notificationContainer}>
              {item.UserImage ? (
                <Image
                  source={{
                    uri: `https://mgfcuploads.s3-ap-southeast-1.amazonaws.com/fcintranet/ProfileImages/${item.UserImage}`,
                  }}
                  style={styles.userImage}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  style={styles.userImage}
                  source={Avatar}
                  resizeMode="contain"
                />
              )}
              <View style={styles.notificationContent}>
                <Text style={styles.notificationText}>{item.MessageTitle}</Text>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 8,
  },
});

export default ListNotification;
