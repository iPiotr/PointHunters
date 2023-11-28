import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  GlobalStyles,
  RewardItem,
  AchievementItem,
  Achievements,
  Rewards,
} from "@components";
import {
  fetchAchievements,
  fetchRewards,
  fetchUserById,
} from "../../services/firebaseService";
import styles from "./statistics.styles";

import { AchievementsModal, RewardsModal, UserType } from "@components";
const userID = 1;

const RANDOM_IMAGE_URL = "https://picsum.photos/00";
const screenWidth = Dimensions.get("window").width;
const contentWidth = screenWidth * 0.9;

const Statistics: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievements>({});
  const [rewards, setRewards] = useState<Rewards>({});
  const [isAchievementsModalVisible, setAchievementsModalVisible] =
    useState(false);
  const [isRewardsModalVisible, setRewardsModalVisible] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  const firstFourAchievements = Object.values(achievements).slice(0, 4);
  const remainingAchievements = Object.values(achievements).slice(4);

  useEffect(() => {
    const unsubscribeAchievements = fetchAchievements(setAchievements);
    const unsubscribeRewards = fetchRewards(setRewards);
    const user = fetchUserById(userID, (userData: UserType | null) => {
      if (userData) {
        setUser(userData);
      }
    });

    return () => {
      unsubscribeAchievements();
      unsubscribeRewards();
      user;
    };
  }, []);

  return (
    <View style={GlobalStyles.container}>
      <AchievementsModal
        isVisible={isAchievementsModalVisible}
        onClose={() => setAchievementsModalVisible(false)}
        achievements={achievements}
      />
      <RewardsModal
        isVisible={isRewardsModalVisible}
        onClose={() => setRewardsModalVisible(false)}
        rewards={rewards}
      />

      <View style={[GlobalStyles.topBar, styles.topBarSpec]}>
        <Image
          source={{ uri: RANDOM_IMAGE_URL }}
          style={GlobalStyles.profilePhoto}
        />
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          Hello, {user ? `${user.name}` : "Loading..."}
        </Text>
      </View>

      <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
        Rewards
      </Text>

      <View style={styles.items}>
        {Object.values(rewards)
          .slice(0, 2)
          .map((reward) => (
            <RewardItem key={reward.title} reward={reward} />
          ))}
        {Object.values(rewards).length > 2 && (
          <TouchableOpacity
            style={{ opacity: 0.5 }}
            onPress={() => setRewardsModalVisible(true)}
          >
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              ... and more
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
          Achievements
        </Text>
        {Object.values(achievements)
          .slice(0, 2)
          .map((achievement, index) => (
            <AchievementItem
              key={index}
              achievement={achievement}
              contentWidth={contentWidth}
            />
          ))}
        {Object.values(achievements).length > 2 && (
          <TouchableOpacity onPress={() => setAchievementsModalVisible(true)}>
            <Text style={{ textAlign: "center", fontSize: 16, marginTop: 14 }}>
              show more
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default Statistics;
