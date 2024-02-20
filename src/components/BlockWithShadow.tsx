// @ts-nocheck
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../utils/colors";

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
    <View style={styles.container}>
      <View
        style={[
          styles.content,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  content: {
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
  endElement: {
    marginLeft: "auto",
  },
});

export default BlockWithShadow;
