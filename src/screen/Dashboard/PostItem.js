import React, { memo, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
//import HTML from "react-native-render-html";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomSlider from "../../Component/CustomSlider/customSlider";
import constants from "../../constants";
import TextConatiner from "./TextContainer";
const source = `<div class="postbody">  <div class="xg_user_generated">  <p><span style="font-size: 14pt;"><strong>FC ANNUAL AWARDS</strong></span></p>  <p>&nbsp;</p>  <p>To the FC team,</p>  <p>We are excited to invite you to the <u>First Contact Virtual Annual Awards Ceremony</u>.</p>  <p>Below you will find a reminder of the time local to your state and of course the invitation to join via zoom, followed by the zoom link to join us.</p>  <p>We look forward to sharing this time with you and recognising and celebrating our people during this event!</p>  <p><u>Details</u></p>  <p>First Contact is inviting you to a scheduled Zoom meeting.</p>  <p><strong>Date</strong>: Tuesday 15<sup>th</sup> February</p>  <p><strong>Topic</strong>: First Contact Annual Awards Event</p>  <p><strong>Time</strong>:</p>  <p>VIC:&nbsp; &nbsp; &nbsp; &nbsp; 5:00 PM</p>  <p>NSW:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.00 PM</p>  <p>QLD:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.00 PM</p>  <p>SA:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;4.30 PM</p>  <p>WA:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2.00 PM</p>  <p>&nbsp;</p>  <p>Join Zoom Meeting:</p>  <p><a href="https://us02web.zoom.us/j/85477580258?pwd=cUZYV0xSamxUU3F1UjlsRWlZSHFMQT09">https://us02web.zoom.us/j/85477580258?pwd=cUZYV0xSamxUU3F1UjlsRWlZS...</a></p>  <p>Meeting ID: 854 7758 0258</p>  <p>Passcode: 731670</p>  <p>Look forward to seeing you there!</p>  <p>Kind Regards,</p>  <p>First Contact</p>  </div>  </div>`;
const PostItem = ({
  UserName,
  UserImage,
  PostId,
  PostImage,
  Post,
  Likes,
  Comments,
  IsLike,
  Content,
  postTime,
  onPressComment,
  onPressProfile,
}) => {
  const [isLiked, setIsLiked] = useState(IsLike);
  const [likeCount, setLikeCount] = useState(Likes);

  let apiCalled = false;
  const handleLikePress = async () => {
    if (apiCalled)
      try {
        const UserId = await AsyncStorage.getItem("UserId");
        const url = `https://fcbackapi.netlify.app/.netlify/functions/api/posts/like/${PostId}/${JSON.parse(
          UserId
        )}`;

        const response = await axios.post(url);
        if (response.status === 200) {
          const amount = isLiked ? -1 : +1;
          setLikeCount(likeCount + amount);
          setIsLiked(!isLiked);
        } else {
          console.error("Failed to like/unlike post");
        }
      } catch (error) {
        console.error("Error:", error);
      }
  };

  useEffect(() => {
    setLikeCount(likeCount);
  }, []);
  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <View style={styles.postProifleUserName}>
          <TouchableOpacity onPress={onPressProfile}>
            <Image
              source={{
                uri: `https://mgfcuploads.s3-ap-southeast-1.amazonaws.com/fcintranet/ProfileImages/${UserImage}`,
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>

          <Text style={styles.username}>
            {UserName}-{PostId}
          </Text>
        </View>
        <Text>{postTime}</Text>
      </View>
      {/* <Text style={styles.captionTitle}>{Post}</Text> */}
      <TextConatiner source={Post} />
      <CustomSlider
        // onpress={(item) => onImagePress(item)}
        data={
          PostImage
            ? [
                {
                  url: `https://mgfcuploads.s3-ap-southeast-1.amazonaws.com/fcintranet/Blogs/${PostImage}`,
                },
                {
                  url: `https://mgfcuploads.s3-ap-southeast-1.amazonaws.com/fcintranet/Blogs/${PostImage}`,
                },
              ]
            : []
        }
        top={30}
      />
      <View style={styles.postFooter}>
        <View style={styles.interactions}>
          <View style={styles.leftIntraction}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={handleLikePress}
            >
              {isLiked ? (
                <AntDesign
                  name="heart"
                  size={24}
                  color={constants.colors.red}
                  style={styles.icon}
                />
              ) : (
                <AntDesign
                  name="hearto"
                  size={24}
                  color={constants.colors.grey}
                  style={styles.icon}
                />
              )}

              <Text style={styles.interaction}>{likeCount} </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressComment}
              style={styles.iconContainer}
            >
              <Feather
                name="message-circle"
                size={24}
                color={constants.colors.grey}
                style={styles.icon_comment}
              />
              <Text style={styles.interaction}>{Comments}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.iconContainer}>
            <FontAwesome
              name="bookmark-o"
              size={24}
              color={constants.colors.grey}
              style={styles.icon_comment}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default memo(PostItem);

const styles = StyleSheet.create({
  postContainer: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: constants.colors.white,
    margin: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  postProifleUserName: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    marginRight: 8,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  postFooter: {
    //paddingHorizontal: 16,
  },
  leftIntraction: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  captionTitle: {
    fontSize: 16,
    marginBottom: 18,
    marginTop: 10,
    color: "grey",
  },
  caption: {
    fontSize: 16,
    marginBottom: 8,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  interactions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  interaction: {
    fontSize: 16,
    color: "#777",
    fontWeight: "bold",
  },
  icon: {
    marginRight: 5,
  },
  icon_comment: {
    marginLeft: 10,
    marginRight: 5,
  },
});
