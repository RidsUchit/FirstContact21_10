import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

import HTMLView from "react-native-htmlview";
import { SafeAreaView } from "react-native-safe-area-context";
import Component from "../../Component";
import constants from "../../constants";

const JobDetailScreen = ({ route, navigation }) => {
  const JobID = route.params.jobid;
  const [jobDetails, setJobDetails] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = `https://fcbackapi.netlify.app/.netlify/functions/api/joblist/${JSON.parse(
      JobID
    )}`;
    console.log(url);

    axios
      .get(url)
      .then((res) => {
        setJobDetails(res.data);
        //console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching job details: ", error);
      });
  };
  const handleGoBack = () => {
    navigation.goBack();
  };
  const title = jobDetails.map((obj) => obj.Title);
  const city = jobDetails.map((obj) => obj.City);
  const content = jobDetails.map((obj) => obj.Content);

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
        <ScrollView contentContainerStyle={styles.content}>
          {jobDetails && (
            <>
              <Text style={styles.jobTitle}>{title}</Text>
              <Text style={styles.jobLocation}>Job Location: {city} </Text>

              <HTMLView value={content.toString()} />
            </>
          )}
        </ScrollView>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => navigation.navigate("JobApply", { jobid: JobID })}
        >
          <Text style={styles.applyButtonText}>Quick Apply For This Job</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
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
  jobLocation: {
    fontSize: 18,
    marginBottom: 10,
  },
  jobPostedDate: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  applyButton: {
    backgroundColor: "#3498db",
    padding: 15,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default JobDetailScreen;
