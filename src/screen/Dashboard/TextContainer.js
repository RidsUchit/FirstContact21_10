import React, { useState } from "react";
import {
  TouchableOpacity,
  useWindowDimensions,
  View,
  Text,
  SafeAreaView,
} from "react-native";
import RenderHtml from "react-native-render-html";
import constants from "../../constants";
export default function TextConatiner(props) {
  const { width } = useWindowDimensions();
  const [expanded, setExpanded] = useState(false);

  const toggleReadMore = () => {
    setExpanded(!expanded);
  };

  const extractTextFromHtml = (htmlContent, maxLength = 100) => {
    // Remove HTML tags and truncate the text to maxLength characters
    const regex = /(<([^>]+)>)/gi;
    const plainText = htmlContent.replace(regex, "");
    if (plainText.length <= maxLength) {
      return plainText;
    } else {
      return plainText.substr(0, maxLength) + "...";
    }
  };

  return (
    <SafeAreaView>
      {!expanded ? (
        <RenderHtml
          contentWidth={width}
          source={{ html: extractTextFromHtml(props?.source) }}
          defaultTextProps={{ numberOfLines: 4 }}
        />
      ) : (
        <RenderHtml contentWidth={width} source={{ html: props?.source }} />
      )}

      <TouchableOpacity
        style={{ marginBottom: 20 }}
        onPress={() => toggleReadMore()}
      >
        {props?.source && props?.source.length > 300 && (
          <Text style={{ color: constants.colors.primary, fontWeight: 600 }}>
            {!expanded ? "Read More" : "Read Less"}
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}
