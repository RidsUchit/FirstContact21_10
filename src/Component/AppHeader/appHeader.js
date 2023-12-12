import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import constants from "../../constants";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import { useContext } from "react";
import { AppContext } from "../../Context/appContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const AppHeader = (props) => {
  const { contextState, setContextState } = useContext(AppContext);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("UserName");
      await AsyncStorage.removeItem("UserId");
      await AsyncStorage.removeItem("IsLoggedIn");

      setContextState({
        ...contextState,
        authToken: "",
      });
    } catch (error) {
      console.log("Error logging out:", error.message);
    }
  };
  return (
    <LinearGradient
      colors={[constants.colors.primary, constants.colors.secondary]}
      style={styles.appHeaderStyle}
    >
      {props?.isBackBtn && (
        <TouchableOpacity
          onPress={() => {
            props.onPressBtn();
          }}
        >
          <Fontisto
            name="arrow-left"
            size={15}
            style={{ paddingLeft: 10 }}
            color={constants.colors.white}
          />
        </TouchableOpacity>
      )}

      {props?.isLeftIconVisible && (
        <TouchableOpacity
          onPress={() => {
            // handleLogout();
          }}
        >
          <Fontisto
            name="fog"
            size={24}
            style={{ paddingLeft: 10 }}
            color={constants.colors.white}
          />
        </TouchableOpacity>
      )}
      {props?.headerTitle && (
        <Text style={styles.headerTitle}>{props.headerTitle}</Text>
      )}
      {props?.isRightIconVisible && (
        <TouchableOpacity
          onPress={() => {
            handleLogout();
          }}
        >
          <AntDesign
            name="logout"
            size={24}
            style={{ paddingRight: 10 }}
            color={constants.colors.white}
          />
        </TouchableOpacity>
      )}

      {props?.isBackBtn && <View style={{ width: 50 }} />}
    </LinearGradient>
  );
};
export default AppHeader;
const styles = StyleSheet.create({
  appHeaderStyle: {
    height: Platform.OS == "android" ? 50 : 50,
    paddingTop: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: 10,
    color: constants.colors.white,
  },
});
