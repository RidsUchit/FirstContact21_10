import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import axios from "axios";

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
    <TouchableOpacity onPress={() => handleJobDetail(item)}>
      <View style={styles.jobItem}>
        <Text style={styles.jobTitle}>{item.Title}</Text>
        <Text style={styles.jobLocation}>{item.City}</Text>
        {/* <Text style={styles.jobId}>{`Job ID: ${item.JobDetailID}`}</Text> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#3498db"
          style={styles.loadingIndicator}
        />
      ) : (
        <FlatList
          data={jobData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderJobItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  jobItem: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
