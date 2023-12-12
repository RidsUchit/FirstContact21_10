import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  SafeAreaView,
  StatusBar,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import constants from "../../constants";
import Component from "../../Component";
import { Entypo, Ionicons } from "@expo/vector-icons";

export default function CreatPost() {
  const [imageList, setImage] = useState([]);
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    media: [],
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (result?.assets != null && result?.assets != undefined) {
      let selectedImageList = postData?.media;
      selectedImageList.push(result.assets);
      console.log("state==>", selectedImageList);
      setTimeout(() => {
        setPostData({
          ...postData,
          media: selectedImageList,
        });
      }, 100);
    }
  };

  const removeImage = (index) => {
    let updatedImageList = postData?.media?.filter(
      (item, itemIndex) => itemIndex !== index
    );
    setPostData({
      ...postData,
      media: updatedImageList,
    });
  };

  const submitPost = () => {
    const { media, title, description } = postData;

    if (title.trim() == "" && title.length <= 0) {
      Alert.alert(
        constants.appConstant.app_name,
        constants.appConstant.PLEASE_SELECT_TITLE
      );
    } else if (description.trim() == "" && description.length <= 0) {
      Alert.alert(
        constants.appConstant.app_name,
        constants.appConstant.PLEASE_SELECT_DESC
      );
    }

    if (media && media.length > 0) {
    }
  };
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={constants.colors.primary}
      />
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <Component.AppHeader
          headerTitle="Dashboard"
          isRightIconVisible={true}
          isLeftIconVisible={true}
        />
        <ScrollView>
          <View style={{ flex: 1, padding: 20 }}>
            <Text style={styles.label}>Title</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                value={postData?.title}
                placeholder="Enter post title..."
                onChangeText={(text) => {
                  setPostData({
                    ...postData,
                    title: text,
                  });
                }}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="off"
                maxLength={300}
              />
            </View>

            <Text style={styles.label}>Description</Text>
            <View style={[styles.inputView, { height: 200 }]}>
              <TextInput
                style={[styles.inputText]}
                value={postData?.description}
                placeholder="Wirte something..."
                onChangeText={(text) => {
                  setPostData({
                    ...postData,
                    description: text,
                  });
                }}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="off"
                multiline={true}
              />
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: constants.colors.secondary,
                backgroundColor: constants.colors.secondary, //"rgba(201, 117, 210, 0.2)",
              }}
              onPress={pickImage}
            >
              <Entypo
                name={"camera"}
                size={22}
                color={constants.colors.white}
              />
              <Text
                style={{
                  color: constants.colors.white,
                  fontWeight: 700,
                  fontSize: 16,
                  marginLeft: 5,
                }}
              >
                {" "}
                Photos
              </Text>
            </TouchableOpacity>

            {/* Render selected image list */}
            <FlatList
              data={postData?.media}
              extraData={postData?.media}
              horizontal={true}
              renderItem={({ item, index }) => (
                <>
                  {/* {console.log("itemitem", item)} */}
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      zIndex: 9999,
                    }}
                    onPress={() => removeImage(index)}
                  >
                    <Entypo
                      size={16}
                      color={constants.colors.primary}
                      name={"circle-with-cross"}
                    />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: item[0].uri }}
                    style={{ width: 80, height: 80, margin: 10 }}
                  />
                </>
              )}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={<View style={{ height: 100 }} />}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            position: "absolute",
            bottom: 10,
            width: "90%",
            flexDirection: "row",
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            borderWidth: 0,
            borderColor: constants.colors.secondary,
            backgroundColor: constants.colors.primary, //"rgba(201, 117, 210, 0.2)",
          }}
          onPress={() => {
            submitPost();
          }}
        >
          <Text
            style={{
              color: constants.colors.white,
              fontWeight: 700,
              fontSize: 16,
              marginRight: 5,
            }}
          >
            {" "}
            Post
          </Text>
          <Ionicons
            name={"send-outline"}
            size={22}
            color={constants.colors.white}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  inputView: {
    width: "100%",
    backgroundColor: constants.colors.white,
    padding: 10,
    borderRadius: 10,
    borderColor: constants.colors.secondary,
    borderWidth: 1,
    marginBottom: 20,
  },
  inputText: {
    // height: 50,
    color: "#000000",
    borderColor: "#333333",
  },
  label: {
    color: constants.colors.secondary,
    fontSize: 16,
  },
});
