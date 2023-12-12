import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  Alert,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
} from "react-native";
import axios from "axios";
//import { SelectList } from "react-native-dropdown-select-list";
import { Picker } from "@react-native-picker/picker";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Component from "../../Component";
import CustomDropDown from "../../Component/CustomDropdown/customDropdown";
import constants from "../../constants";
const JobApplyScreen = ({ route, navigation }) => {
  const JobID = route.params.jobid;
  const [input1, setinput1] = useState("");
  const [input2, setinput2] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      axios
        .get(
          `https://fcbackapi.netlify.app/.netlify/functions/api/jobquestions/${JobID}`
        )
        .then((res) => {
          setData(res.data);
          //console.log(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleApply = async () => {
    const Username = await AsyncStorage.getItem("UserName");

    let message = "Application Summary:<br> ";

    data.forEach((item) => {
      const question = item.Question;
      let answer = "";

      switch (item.QuestionTypeId.toString()) {
        case "1":
          answer = input1;
          break;
        case "2":
          answer = input2;
          break;
        case null:
          answer = "No answer provided.";
          break;
        default:
          answer = "No answer provided.";
      }

      message += `Q: ${question}<br> A: ${answer}<br>`;
    });

    const requestBody = {
      jobId: JobID.toString(),
      username: JSON.parse(Username),
      message,
    };
    //console.log("Application Data:",requestBody);

    try {
      console.log(requestBody);

      const response = await axios.post(
        "https://fcbackapi.netlify.app/.netlify/functions/api/jobapply",
        requestBody
      );

      if (response.status === 200) {
        // Successful
        //console.log(response);
        Alert.alert("Success", "Applied Successfully!");
        console.log("Applied successful!");
        navigation.navigate("Job");
      } else {
        // Server returned an unexpected response
        Alert.alert("Error", "An error occurred during login.");
      }
    } catch (error) {
      // Error occurred during the HTTP request or server returned an error
      if (error.response && error.response.status === 401) {
        Alert.alert("Error", "Invalid Details");
      } else {
        Alert.alert("Error", "An error occurred during Application.");
      }
    }
  };
  const renderItem = ({ item, index }) => {
    let answerComponent;
    switch (item.QuestionTypeId.toString()) {
      case "1":
        answerComponent = (
          <TextInput
            placeholder="Type your answer"
            multiline
            value={input1}
            onChangeText={(text) => setinput1(text)}
          />
        );
        break;
      case "2":
        answerComponent = <CustomDropDown onChange={(option) => {}} />;
        break;
      case null:
        // Implement the selection answer component based on your requirements
        // For example, you can use radio buttons or checkboxes
        answerComponent = null;
        break;
      default:
        answerComponent = null;
    }

    return (
      <View style={styles.questionItem}>
        <Text>{item.Question}</Text>
        <View style={styles.answerItem}>{answerComponent}</View>
      </View>
    );
  };

  const renderApply = () => {
    return (
      <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
        <Text style={styles.applyButtonText}>Apply Now</Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constants.colors.primary}
      />
      <SafeAreaView style={styles.container}>
        <Component.AppHeader
          headerTitle="Jobs"
          isBackBtn={true}
          onPressBtn={() => {
            navigation.goBack();
          }}
        />

        {data && data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.ID}
            ListFooterComponent={renderApply}
          />
        ) : (
          <View style={styles.emptyScreen}>
            <ActivityIndicator
              size={"large"}
              color={constants.colors.primary}
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  emptyScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "60%",
  },
  header: {
    backgroundColor: "#3498db",
    padding: 15,
    justifyContent: "flex-start",
  },
  goBackButton: {
    color: "#fff",
    fontSize: 18,
  },
  content: {
    padding: 20,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  questionItem: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  answerItem: {
    backgroundColor: "#f9f9f9",
    padding: 8,
    marginBottom: 10,
    borderRadius: 10,
  },
  applyButton: {
    backgroundColor: "#3498db",
    padding: 15,
    alignItems: "center",
    marginBottom: 50,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default JobApplyScreen;
