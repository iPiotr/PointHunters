import React from "react";
import { Text } from "react-native";
// import ProgressBar from "react-native-progress/Bar";
import { Dimensions } from "react-native";
import colors from "../utils/colors";
import { BlockWithShadow } from "@components";
import styles from "../screens/statistics/statistics.styles";
import { Achievement } from "./types";

const screenWidth = Dimensions.get("window").width;
const buttonWidth = screenWidth * 0.8;

type AchievementItemProps = {
  achievement: Achievement;
  contentWidth?: number; // Optional prop to specify the width of the content area
};

const AchievementItem: React.FC<AchievementItemProps> = ({
  achievement,
  contentWidth,
}) => {
  return (
    <BlockWithShadow
      width="90%"
      borderRadius={10}
      flexDirection={"column"}
      padding={20}
    >
      <Text style={[styles.boldText, { fontSize: 18 }]}>
        {achievement.title}
      </Text>
      <Text>{achievement.description}</Text>
    </BlockWithShadow>
  );
};

export default AchievementItem;
