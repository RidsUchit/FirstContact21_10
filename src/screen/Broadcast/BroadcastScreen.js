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
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const BroadcastScreen = ({ navigation }) => {
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSendNotification = async () => {
    setIsLoading(true);
    try {
      const url =
        "https://fcbackapi.netlify.app/.netlify/functions/api/sendToAll";
      // Make a POST request to your server
      const response = await axios.post(url, {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Send Notification</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack(); // Navigate back to the previous screen (ProfileScreen)
          }}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
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
    </View>
  );
};

export default BroadcastScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
