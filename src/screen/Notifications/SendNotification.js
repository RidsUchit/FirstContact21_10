import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import constants from "../../constants";
import Component from "../../Component";

const SendNotification = ({ navigation }) => {
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendNotification = async () => {
    setIsLoading(true);
    const currentUserId = await AsyncStorage.getItem("UserId");
    try {
      const url =
        "https://fcbackapi.netlify.app/.netlify/functions/api/sendToAll";
      // Make a POST request to your server
      const response = await axios.post(url, {
        userId: currentUserId,
        bodyTitle: notificationTitle,
        bodyMessage: notificationMessage,
      });
      setIsLoading(false);
      if (response.status === 200) {
        Alert.alert("Success", "Notification Send Successfully");
      } else {
        // Server returned an unexpected response
        Alert.alert("Error", "Error sending notification");
      }
    } catch (err) {
      setIsLoading(false);
      // Error occurred during the HTTP request or server returned an error
      console.log(err);
      Alert("Error", "Something went wrong");
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
          headerTitle="Send Notification"
          isBackBtn={true}
          onPressBtn={() => {
            navigation.goBack();
          }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Notification Title"
            value={notificationTitle}
            onChangeText={(text) => setNotificationTitle(text)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Notification Message"
            multiline
            value={notificationMessage}
            onChangeText={(text) => setNotificationMessage(text)}
          />

          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => {
              isLoading ? null : handleSendNotification();
            }}
          >
            {!isLoading ? (
              <Text style={styles.sendButtonText}>Send</Text>
            ) : (
              <ActivityIndicator size="large" color="#aaa" />
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SendNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "left",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    padding: 10,
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center", // Center vertically
    padding: 16,
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 16,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  sendButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
