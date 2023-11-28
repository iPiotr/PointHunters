import React from "react";
import { Text, Image } from "react-native";
import { GlobalStyles, BlockWithShadow } from "@components";
import styles from "../screens/statistics/statistics.styles";
import { Reward } from "./types";

const randomImageUrl = "https://picsum.photos/00";

const RewardItem: React.FC<{ reward: Reward }> = ({ reward }) => (
  <BlockWithShadow
    width="90%"
    borderRadius={10}
    flexDirection={"column"}
    padding={10}
    alignItems={"center"}
  >
    <Image source={{ uri: randomImageUrl }} style={GlobalStyles.profilePhoto} />
    <Text style={styles.boldText}>{reward.amount}</Text>
    <Text>{reward.title}</Text>
    <Text>{reward.type}</Text>
  </BlockWithShadow>
);

export default RewardItem;
