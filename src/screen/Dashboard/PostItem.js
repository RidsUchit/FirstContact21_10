import React, { memo, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
//import HTML from "react-native-render-html";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
}) => {
  const [isLiked, setIsLiked] = useState(IsLike);
  const [likeCount, setLikeCount] = useState(Likes);

  const handleLikePress = async () => {
    try {
      const UserId = await AsyncStorage.getItem("UserId");
      const url = `https://fcbackapi.netlify.app/.netlify/functions/api/posts/like/${PostId}/${JSON.parse(
        UserId
      )}`;
      //console.log(url);

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
        <Image
          source={{
            uri: `https://mgfcuploads.s3-ap-southeast-1.amazonaws.com/fcintranet/ProfileImages/${UserImage}`,
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>
          {UserName}-{PostId}
        </Text>
      </View>
      {PostImage && (
        <Image
          source={{
            uri: `https://mgfcuploads.s3-ap-southeast-1.amazonaws.com/fcintranet/Blogs/${PostImage}`,
          }}
          style={styles.image}
        />
      )}
      <View style={styles.postFooter}>
        <Text style={styles.captionTitle}>{Post}</Text>
        {/* 
        {
          <HTML
            source={{ html: Content }}
            contentWidth={Dimensions.get("window").width}
          />
        } */}

        <View style={styles.interactions}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={handleLikePress}
          >
            {isLiked ? (
              <AntDesign
                name="heart"
                size={24}
                color="#D70040"
                style={styles.icon}
              />
            ) : (
              <AntDesign
                name="hearto"
                size={24}
                color="#3BA7DC"
                style={styles.icon}
              />
            )}

            <Text style={styles.interaction}>{likeCount} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <FontAwesome
              name="comment-o"
              size={24}
              color="#3BA7DC"
              style={styles.icon_comment}
            />
            <Text style={styles.interaction}>{Comments}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default memo(PostItem);

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    marginLeft: 8,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  postFooter: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  captionTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
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
  },
  interaction: {
    fontSize: 14,
    color: "#777",
  },
  icon: {
    marginRight: 5,
  },
  icon_comment: {
    marginLeft: 10,
    marginRight: 5,
  },
});
