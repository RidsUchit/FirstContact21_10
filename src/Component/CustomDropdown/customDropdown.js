import { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CustomDropDown = (props) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const pickerRef = useRef();

  const getDropDownValue = (itemValue) => {
    setSelectedLanguage(itemValue);
    props.onChange(itemValue);
  };

  return (
    <Picker
      ref={pickerRef}
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) => getDropDownValue(itemValue)}
    >
      <Picker.Item style={styles.items} label="Select Yes/No" value="" />
      <Picker.Item style={styles.options} label="Yes" value="Yes" />
      <Picker.Item style={styles.options} label="No" value="No" />
    </Picker>
  );
};

const styles = StyleSheet.create({
  items: {
    color: "grey",
    fontSize: 16,
  },
  options: {
    fontSize: 16,
  },
});

export default CustomDropDown;
