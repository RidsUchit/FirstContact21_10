import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";

import axios from "axios";
import constants from "../../constants";
import Component from "../../Component";

const JobScreen = ({ navigation }) => {
  const [jobData, setJobData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData_Job();
  }, []);

  const fetchData_Job = async () => {
    try {
      setIsLoading(true);

      axios
        .get(`https://fcbackapi.netlify.app/.netlify/functions/api/joblist`)
        .then((res) => {
          setJobData(res.data);
          //console.log(res.data);

          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  const handleJobDetail = (item) => {
    //const itemId = 123; // Replace with your item ID
    // otherParam = "Some other parameter"; // Replace with your other parameter

    // navigation.navigate("JobDetail", {
    //   itemId,
    //   otherParam,
    // });

    navigation.navigate("JobDetail", { jobid: item.JobDetailID });
  };

  const renderJobItem = ({ item }) => (
    <TouchableOpacity
      style={styles.jobItem}
      onPress={() => handleJobDetail(item)}
    >
      <Text style={styles.jobTitle}>{item.Title}</Text>
      <Text style={styles.jobLocation}>{item.City}</Text>
    </TouchableOpacity>
  );

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
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#3498db"
            style={styles.loadingIndicator}
          />
        ) : (
          <FlatList
            contentContainerStyle={{ marginTop: 10 }}
            data={jobData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderJobItem}
          />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  jobItem: {
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: constants.colors.white,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  jobLocation: {
    fontSize: 16,
    marginBottom: 5,
  },
  jobId: {
    fontSize: 14,
  },
});

export default JobScreen;
