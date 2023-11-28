// components/RoundButton.tsx

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../utils/colors";

type Props = {
  onPress: () => void;
  title: string;
  buttonWidth: number;
  backgroundColor: string;
};

const RoundButton: React.FC<Props> = ({
  onPress,
  title,
  buttonWidth,
  backgroundColor,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { width: buttonWidth, backgroundColor: backgroundColor },
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
    margin: 10,
  },
  buttonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
  },
});

export default RoundButton;
