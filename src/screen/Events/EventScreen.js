import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import BirthdayCard from "./BirthdayCard";
import axios from "axios";
import constants from "../../constants";
import Component from "../../Component";
const EventScreen = () => {
  const [birthdays, setbirthdays] = useState([]);
  const [upcomingBirthdays, setupcomingBirthdays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData_birthdays();
    fetchData_upcomingbirthdays();
    checkLoadingStatus();
  }, []);

  const fetchData_birthdays = async () => {
    try {
      setIsLoading(true);

      axios
        .get(
          `https://fcbackapi.netlify.app/.netlify/functions/api/todaybirthday`
        )
        .then((res) => {
          setbirthdays(res.data);
          //console.log(res.data);

          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const fetchData_upcomingbirthdays = async () => {
    try {
      setIsLoading(true);

      axios
        .get(
          `https://fcbackapi.netlify.app/.netlify/functions/api/upcomingbirthdays`
        )
        .then((res) => {
          setupcomingBirthdays(res.data);
          // console.log(res.data);

          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  const checkLoadingStatus = () => {
    if (birthdays.length > 0 && upcomingBirthdays.length > 0) {
      setIsLoading(false);
    }
  };
  const renderLoader = () => {
    <View style={styles.loaderStyle}>
      <ActivityIndicator size="large" color="#aaa" />
    </View>;
  };

  const _renderitem = ({ item }) => (
    <BirthdayCard
      Username={item.Username}
      ProfileImage={item.ProfileImage}
      UserId={item.UserId}
      BirthDateMonth={item.BirthDateMonth}
      age_turning={item.age_turning}
    />
  );
  const renderHeader_TodayBirthday = () => {
    if (birthdays.length === 0) {
      return null; // Return null to hide the header
    }

    return <Text style={styles.headingText}>Today's Birthdays</Text>;
  };
  const renderHeader_UpcomingBirthday = () => {
    if (upcomingBirthdays.length === 0) {
      return null; // Return null to hide the header
    }

    return <Text style={styles.headingText}>Upcoming Birthday</Text>;
  };
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constants.colors.primary}
      />
      <SafeAreaView style={styles.container}>
        <Component.AppHeader
          headerTitle="Birthdays"
          isBackBtn={true}
          onPressBtn={() => {
            navigation.goBack();
          }}
        />

        {isLoading ? (
          renderLoader()
        ) : (
          <>
            <FlatList
              data={birthdays}
              keyExtractor={(item, index) => index.toString()}
              renderItem={_renderitem}
              ListHeaderComponent={renderHeader_TodayBirthday}
            />
            <FlatList
              data={upcomingBirthdays}
              keyExtractor={(item, index) => index.toString()}
              renderItem={_renderitem}
              ListHeaderComponent={renderHeader_UpcomingBirthday}
            />
          </>
        )}
      </SafeAreaView>
    </>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "lightblue",
    margin: 10,
  },
  loaderStyle: {
    // marginVertical: 16,
    // alignItems: "center",
    // width: "100%",
    // height: 28,
  },
});
