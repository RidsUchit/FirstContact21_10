import { SafeAreaView, View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import constants from "../../constants";

const OtherProfile = (props) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
            marginTop: 200,
            backgroundColor: "#E6EEFA",
            border: 50,
            borderRadiusTopRight: 50,
          }}
        >
          <View style={styles.topRow}>
            <View>
              <Text>200</Text>
              <Text>Followers</Text>
            </View>
            <View>
              <Image
                source={{
                  uri: `https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D`,
                }}
                style={styles.avatar}
              />
            </View>
            <View>
              <Text>200</Text>
              <Text>Following</Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 20,
            }}
          >
            <Text>Ravendra Singh</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constants.colors.primary,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    border: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -50,
    borderWidth: 2,
    borderColor: constants.colors.white,
  },
});
export default OtherProfile;
