import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

const RewardScreen = () => {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const currentUserId = await AsyncStorage.getItem("UserId");
      let url = `https://fcbackapi.netlify.app/.netlify/functions/api/rewards/${JSON.parse(
        currentUserId
      )}`;
      console.log(url);

      axios.get(url).then((res) => {
        setRewards(res.data);
        //console.log(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  };
  const PointsEarned = rewards.map((obj) => obj.PointsEarned);
  const CurrentMonthPoints = rewards.map((obj) => obj.CurrentMonthPoints);
  const PointsRedeemed = rewards.map((obj) => obj.PointsRedeemed);
  const RemainingBalance = rewards.map((obj) => obj.RemainingBalance);
  const blockColors = ["#6495ED", "#D66FCA", "#EBB449", "#52BE80"];
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View
          style={[styles.blockWithShadow, { backgroundColor: blockColors[0] }]}
        >
          <Text style={styles.title}>Points Earned</Text>
          <Text style={styles.text}>{PointsEarned}</Text>
        </View>
        <View
          style={[styles.blockWithShadow, { backgroundColor: blockColors[1] }]}
        >
          <Text style={styles.title}>Current Month Point</Text>
          <Text style={styles.text}>{CurrentMonthPoints}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View
          style={[styles.blockWithShadow, { backgroundColor: blockColors[2] }]}
        >
          <Text style={styles.title}>Points Redeemed</Text>
          <Text style={styles.text}>{PointsRedeemed}</Text>
        </View>
        <View
          style={[styles.blockWithShadow, { backgroundColor: blockColors[3] }]}
        >
          <Text style={styles.title}>Remaining Balance</Text>
          <Text style={styles.text}>{RemainingBalance}</Text>
        </View>
      </View>
    </View>
  );
};

export default RewardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  blockWithShadow: {
    width: 150,
    height: 150,
    borderRadius: 10,
    elevation: 5, // Shadow effect for Android
    shadowColor: "black", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 4, // Shadow blur radius for iOS
    margin: 20,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff",
  },
  text: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "bold",
  },
});
