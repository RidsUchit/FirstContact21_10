import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  useContext,
} from "react";
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
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
//
import axios from "axios";
import PostItem from "./PostItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Component from "../../Component";
import { getCommentListByPostId, postCommentByPostId } from "./DashboardAction";
import { AppContext } from "../../Context/appContext";

const Dashboard = () => {
  const { contextState } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEndReached, setIsEndReached] = useState(false);
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);
  const [userComment, setUserCmtDetails] = useState({
    cmtPostId: "",
    cmtOnPost: "",
    commentList: [],
  });

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

  const handlePresentModalPress = (postId) => {
    setIsLoading(true);
    getCommentListByPostId(
      postId,
      (res) => {
        console.log("resresres=>", postId);
        setUserCmtDetails({
          ...userComment,
          commentList: res,
          cmtPostId: postId,
        });
        setIsLoading(false);
        bottomSheetModalRef.current?.present();
      },
      (err) => {
        setIsLoading(false);
        setUserCmtDetails({
          ...userComment,
          commentList: [],
        });
        console.log("resresres=> err", err);
        bottomSheetModalRef.current?.present();
      }
    );
  };

  const snapPoints = useMemo(() => ["10%", "80%"], []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

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
      console.error("error ===>", error);
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setCurrentPage(1);
  };

  const renderLoader = () => {
    return isLoading ? <Component.LoaderView /> : null;
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
  const cleanCurrentCmt = () => {
    setUserCmtDetails({
      cmtOnPost: "",
      cmtPostId: "",
    });
  };
  const _renderitem = ({ item }) => {
    return (
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
        postTime={"32 mins"}
        onPressLike={() => handleLike(item.PostId)}
        onPressComment={() => {
          handlePresentModalPress(item.PostId);
        }}
        onPressProfile={() => navigation.navigate("OtherProfile")}
      />
    );
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <FlatList
          data={data}
          contentContainerStyle={styles.postList}
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
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={{
            margin: 4,
            shadowColor: "red",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 4,
          }}
          onDismiss={() => {
            cleanCurrentCmt();
          }}
        >
          <Component.CustomCommentSheet
            commentMessage={(text) => {
              console.log("textt", text);
              setUserCmtDetails({
                ...userComment,
                cmtOnPost: text,
              });
            }}
            textMsg={userComment.cmtOnPost}
            onSend={() => {
              let commentData = {
                comment: userComment.cmtOnPost,
                postId: userComment?.cmtPostId,
                userId: contextState.userId,
              };
              postCommentByPostId(
                commentData,
                (res) => {
                  getCommentListByPostId(
                    userComment?.cmtPostId,
                    (res) => {
                      console.log("postCommentByPostId", res);

                      setUserCmtDetails({
                        ...userComment,
                        commentList: res,
                        cmtOnPost: "",
                      });
                      setIsLoading(false);
                    },
                    (err) => {
                      setIsLoading(false);
                      console.log("resresres=> err", err);
                    }
                  );
                },
                (err) => {
                  console.log("new comment res err", err);
                }
              );
            }}
            commentData={userComment.commentList}
          />
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "grey",
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
  postList: {
    margin: 10,
    marginBottom: 0,
    borderRadius: 20,
  },
});
