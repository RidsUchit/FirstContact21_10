import React, { memo } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Avatar from "../../../assets/avatar.png";

const BirthdayCard = ({
  Username,
  ProfileImage,
  UserId,
  BirthDateMonth,
  age_turning,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.boxContainer,
          Platform.OS === "ios" ? styles.shadowIOS : styles.shadowAndroid,
        ]}
      >
        {ProfileImage ? (
          <Image
            source={{
              uri: `https://mgfcuploads.s3-ap-southeast-1.amazonaws.com/fcintranet/ProfileImages/${ProfileImage}`,
            }}
            style={styles.image}
          />
        ) : (
          <Image style={styles.image} source={Avatar} />
        )}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{Username}</Text>
          <Text style={styles.birthdate}>{BirthDateMonth}</Text>
        </View>
        {/* <View style={styles.ageCircle}>
          <Text style={styles.ageText}>{age_turning}</Text>
        </View> */}
      </View>
    </View>
  );
};

export default memo(BirthdayCard);

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  boxContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  shadowAndroid: {
    elevation: 5,
  },
  shadowIOS: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: "column",
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  birthdate: {
    fontSize: 14,
    color: "gray",
  },
  ageCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
  ageText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
