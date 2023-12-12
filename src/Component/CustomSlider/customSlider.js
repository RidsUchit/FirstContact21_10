import { useState, useRef } from "react";
import {
  View,
  FlatList,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  ImageStyle,
  ColorValue,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import styles from "./styles";
import constants from "../../constants";

export const width = Dimensions.get("window").width;

const CustomSlider = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const ref = useRef(null);

  const updateCurrentIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentindex = Math.round(contentOffsetX / width);
    setCurrentIndex(currentindex);
  };

  const Footer = () => {
    return (
      <View style={styles.footView}>
        <View style={styles.dotView}>
          {props.data.map((_, index) => (
            <>
              <View
                key={index}
                style={[
                  styles.dotStyle,
                  currentIndex == index && {
                    backgroundColor: constants.colors.secondary,
                  },
                ]}
              />
            </>
          ))}
        </View>
      </View>
    );
  };

  const renderImage = (item: any) => {
    return (
      <Pressable onPress={() => {}} style={styles.imageView}>
        <Image
          source={{
            uri: item.url,
          }}
          style={styles.imageStyle}
          resizeMode={"cover"}
        />
      </Pressable>
    );
  };

  return (
    <>
      <View style={{}}>
        <FlatList
          ref={ref}
          onMomentumScrollEnd={updateCurrentIndex}
          data={props.data}
          horizontal
          pagingEnabled
          scrollEnabled={props.data?.length > 1 ? true : false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderImage(item)}
        />
      </View>
      {props.data?.length > 1 ? <Footer /> : null}
    </>
  );
};

export default CustomSlider;
