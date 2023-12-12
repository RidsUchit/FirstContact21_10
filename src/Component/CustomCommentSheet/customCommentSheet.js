import * as React from "react";
import {
  Text,
  View,
  TextStyle,
  ViewStyle,
  findNodeHandle,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import constants from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

const CustomCommentSheet = (props) => {
  const commentListRef = React.useRef();

  const _renderitem = ({ item }) => {
    return (
      <View style={styles.commentBox}>
        <Image
          source={{ uri: item?.UserImage }}
          style={styles.commentUserProfile}
        />
        <View style={styles.cmtContent}>
          <Text style={styles.cmtUserName}>{item?.UserName}</Text>
          <Text>{item?.Comment}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.cmtHeader}>Comment</Text>
      <FlatList
        ref={commentListRef}
        showsVerticalScrollIndicator={false}
        data={props.commentData ? props.commentData : []}
        contentContainerStyle={styles.commentList}
        keyExtractor={(item) => item.PostId.toString()}
        renderItem={_renderitem}
        ListFooterComponent={<View style={styles.commentListFooter} />}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 30,
            }}
          >
            <Text>No comments !</Text>
          </View>
        }
      />
      <View style={styles.commentFooter}>
        <TextInput
          style={styles.messageInput}
          multiline={true}
          onChangeText={props.commentMessage}
          placeholder="Write something..."
          value={props?.textMsg}
        />
        <TouchableOpacity style={styles.btnContainer} onPress={props?.onSend}>
          <Ionicons
            name="send-sharp"
            size={30}
            style={{ paddingLeft: 10 }}
            color={constants.colors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomCommentSheet;

const styles = StyleSheet.create({
  cmtHeader: {
    fontSize: 16,
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: constants.colors.shadowColor,
    paddingHorizontal: 10,
    position: "relative",
  },
  commentFooter: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //paddingVertical: 10,
  },
  messageInput: {
    width: "90%",
    backgroundColor: constants.colors.white,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: constants.colors.primary,
  },
  btnContainer: {
    backgroundColor: constants.colors.primary,
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  commentList: {},
  commentBox: {
    flexDirection: "row",
    marginBottom: 10,
  },
  commentUserProfile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: constants.colors.secondary,
    marginRight: 10,
  },
  cmtContent: {
    backgroundColor: constants.colors.white,
    borderRadius: 15,
    borderTopLeftRadius: 0,
    padding: 10,
  },
  cmtUserName: {
    fontSize: 16,
    marginBottom: 5,
  },
  commentListFooter: {
    height: 80,
  },
});
