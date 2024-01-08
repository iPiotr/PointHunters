import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

let randomImageUrl = "https://picsum.photos/000";

type Props = {
  width: number | string;
  borderRadius: number;
  flexDirection?: "row" | "column";
  padding?: number;
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  paddingLeft?: number;
  children: any;
};

const BlockWithShadow: React.FC<Props> = ({
  width,
  borderRadius,
  flexDirection,
  padding,
  alignItems,
  paddingLeft,
  children,
}) => {
  return (
    <View style={styless.container}>
      <View
        style={[
          styless.notification,
          {
            width,
            borderRadius,
            flexDirection,
            padding,
            alignItems,
            paddingLeft,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styless = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  notification: {
    justifyContent: "space-around",
    backgroundColor: colors.postBlock,
    marginBottom: 6,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    width: "90%",
  },
  postPhoto: {
    width: 50,
    height: 50,
    margin: 8,
    borderRadius: 10,
    marginLeft: "auto",
  },
  endElement: {
    marginLeft: "auto",
  },
});

export default BlockWithShadow;
