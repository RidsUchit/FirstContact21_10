import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
//
import axios from "axios";
import PostItem from "./PostItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEndReached, setIsEndReached] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleHomePress = () => {
    if (data.length > 0) {
      // Scroll to the first item in the list
      //flatListRef?.current?.scrollToIndex({ index: 0, animated: true });
      navigation.navigate("Home");
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const currentUserId = await AsyncStorage.getItem("UserId");
      let url = `https://fcbackapi.netlify.app/.netlify/functions/api/posts/${JSON.parse(
        currentUserId
      )}?page=${currentPage}&pageSize=10`;
      console.log(url);
      axios.get(url).then((res) => {
        setIsLoading(false);
        if (res.data.length > 0) {
          if (currentPage === 1) {
            setData(res.data);
          } else {
            setData([...data, ...res.data]);
          }
          setRefreshing(false);
          setIsEndReached(false);
        } else {
          setIsEndReached(true);
        }
      });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setCurrentPage(1);
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };
  const loadMoreItem = () => {
    if (!isEndReached) {
      if (!isLoading) setCurrentPage(currentPage + 1);
    }
  };
  const renderEndMessage = () => {
    if (isEndReached) {
      return (
        <TouchableOpacity
          style={styles.endMessageContainer}
          onPress={handleHomePress}
        >
          <Text style={styles.endMessageText}>-- End of Results --</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const _renderitem = ({ item }) => (
    <PostItem
      UserName={item.UserName}
      UserImage={item.UserImage}
      PostId={item.PostId}
      PostImage={item.PostImage}
      Post={item.Post}
      Likes={item.Likes}
      Comments={item.Comments}
      Content={item.Content}
      IsLike={item.IsLike}
      onPressLike={() => handleLike(item.PostId)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.PostId.toString()}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderLoader}
        renderItem={_renderitem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
      {/* {isEndReached && <Text style={styles.endMessage}>End of Results</Text>} */}
      {renderEndMessage()}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
  endMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  endMessageText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8D918D",
    marginRight: 5,
  },
  homeIcon: {
    marginLeft: 5,
  },
});
