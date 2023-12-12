import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

import constants from "../../constants";
import Component from "../../Component";
import Avatar from "../../../assets/avatar.png";
import { getUserId } from "../../Component/credentials";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchData();
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const roleId = await AsyncStorage.getItem("RoleId");
      console.log(roleId);
      if (roleId === "1") {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const currentUserId = await AsyncStorage.getItem("UserId");
      let url = `https://fcbackapi.netlify.app/.netlify/functions/api/profile/${JSON.parse(
        currentUserId
      )}`;
      console.log(url);

      axios.get(url).then((res) => {
        setUser(res.data);
        // console.log(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const Name =
    user.map((obj) => obj.FirstName) + " " + user.map((obj) => obj.LastName);
  const ProfileImage = user.map((obj) => obj.ProfileImage);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constants.colors.primary}
      />
      <SafeAreaView style={styles.container}>
        <Component.AppHeader
          headerTitle="Profile"
          isBackBtn={true}
          onPressBtn={() => {
            navigation.goBack();
          }}
        />
        <ScrollView contentContainerStyle={styles.innercontainer}>
          {ProfileImage ? (
            <Image
              source={{
                uri: `https://mgfcuploads.s3-ap-southeast-1.amazonaws.com/fcintranet/ProfileImages/${ProfileImage}`,
              }}
              style={styles.avatar}
              resizeMode="contain"
            />
          ) : (
            <Image style={styles.avatar} source={Avatar} resizeMode="contain" />
          )}

          <Text style={styles.name}>{Name}</Text>
          {/* <Text style={styles.email}>john@firstcontact.co</Text> */}
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statTitle}>Followers</Text>
              <Text style={styles.statValue}>150</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statTitle}>Following</Text>
              <Text style={styles.statValue}>200</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statTitle}>Posts</Text>
              <Text style={styles.statValue}>25</Text>
            </View>
          </View>
          {
            /* Conditionally render the "Send notification" button for admin users */
            isAdmin && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.notificationButton}
                  onPress={() => {
                    navigation.navigate("SendNotification");
                  }}
                >
                  <Text style={styles.notificationButtonText}>
                    Send Notification To All Users
                  </Text>
                </TouchableOpacity>
              </View>
            )
          }
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innercontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginTop: 30,
  },
  stat: {
    alignItems: "center",
  },
  statTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 50,
    margin: 20, // Adjust as needed
  },
  notificationButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },
  notificationButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
