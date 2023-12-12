import { StyleSheet, Dimensions, Platform } from "react-native";
import constants from "../../constants";
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  docImageView: {
    width: width - 40,
    height: 149,
    backgroundColor: "grey",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  docImageStyle: {
    width: 83,
    height: 83,
  },
  imageStyle: {
    width: width - 40,
    height: 259,
    borderRadius: 8,
    alignSelf: "center",
  },
  zoomImageStyle: {
    width: width,
    height: "100%",
    alignSelf: "center",
  },
  dotStyle: {
    height: 10,
    width: 10,
    borderRadius: 8,
    // borderWidth: 1.5,
    backgroundColor: constants.colors.primary,
    marginHorizontal: 2.5,
  },
  background: {
    height: 34,
    width: 34,
    borderRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  nextArrow: {
    position: "absolute",
    bottom: 5,
    right: 25,
    transform: [{ rotate: "180deg" }],
  },
  previousarrow: {
    position: "absolute",
    bottom: 5,
    left: 25,
  },
  text: {
    fontWeight: "800",
    fontSize: 12,
  },
  text1: {
    fontSize: 10,
  },
  dotView: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  imageView: {
    // width: width,
    alignItems: "center",
  },
  footView: {
    justifyContent: "space-between",
  },
});

export default styles;
