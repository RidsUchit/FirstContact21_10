import { View, Text, Modal, ActivityIndicator, StyleSheet } from "react-native";
import constants from "../../constants";

const LoaderView = () => {
  return (
    <Modal transparent>
      <View style={styles.mainView}>
        <View style={styles.activeView}>
          <ActivityIndicator size={"large"} color={constants.colors.grey} />
        </View>
      </View>
    </Modal>
  );
};

export default LoaderView;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor:
      Platform.OS === "android" ? "rgba(0, 0, 0, 0.1)" : "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activeView: {
    backgroundColor: constants.colors.white,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
