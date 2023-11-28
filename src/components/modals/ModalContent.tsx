import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Dimensions,
  View,
  Pressable,
  StyleSheet,
} from "react-native";
import { AchievementItem, RewardItem } from "@components";
import { Achievements, Rewards } from "../types";
import styles from "../../screens/statistics/statistics.styles";

const modalContentWidth = Dimensions.get("window").width * 0.9 - 40;

const ModalContent: React.FC<{
  achievements?: Achievements;
  rewards?: Rewards;
}> = ({ achievements, rewards }) => {
  const achievementHeight = 140; // Assuming each AchievementItem height
  const modalHeight = achievementHeight * 4; // Height for 4 achievements

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={(e) => e.stopPropagation()}
      style={[styles.modalContentStyle, { height: modalHeight }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable>
          {achievements &&
            Object.values(achievements).map((achievement, index) => (
              <AchievementItem
                key={index}
                achievement={achievement}
                contentWidth={modalContentWidth}
              />
            ))}
          {rewards &&
            Object.values(rewards).map((reward) => (
              <View key={reward.title} style={{ marginVertical: 10 }}>
                <RewardItem reward={reward} />
              </View>
            ))}
        </Pressable>
      </ScrollView>
    </TouchableOpacity>
  );
};

export default ModalContent;
