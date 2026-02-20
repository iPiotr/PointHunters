// @ts-nocheck
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
  fetchUserAchievements,
  fetchUserById,
} from "../../services/firebaseService";
import useAuth from "../../FirebaseAuth/useAuth";

import styles from "./statistics.styles";
import { AchievementsModal, RewardsModal, UserType } from "@components";

const userID = "pmEy3HB1SHO1y4MYRAShSZ4cmWC2";

const RANDOM_IMAGE_URL = "https://picsum.photos/0";
const screenWidth = Dimensions.get("window").width;
const contentWidth = screenWidth * 0.9;

const Statistics: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievements>({});
  const [rewards, setRewards] = useState<Rewards>({});
  const [isAchievementsModalVisible, setAchievementsModalVisible] =
    useState(false);
  const [isRewardsModalVisible, setRewardsModalVisible] = useState(false);
  const [userData, setUser] = useState<UserType | null>(null);
  const { user } = useAuth();
  const [userAchievements, setUserAchievements] = useState([]);

  // const firstFourAchievements = Object.values(achievements).slice(0, 4);
  // const remainingAchievements = Object.values(achievements).slice(4);

  useEffect(() => {
    if (user && user.uid) {
      // Check if user is not null and has a uid
      const unsubscribeAchievements = fetchAchievements(setAchievements);
      const unsubscribeUserAchievements = fetchUserAchievements(
        user.uid,
        setUserAchievements
      );
      const unsubscribeRewards = fetchRewards(setRewards);
      const userData = fetchUserById(user.uid, (userData: UserType | null) => {
        setUser(userData);
      });

      return () => {
        unsubscribeAchievements();
        unsubscribeUserAchievements();
        unsubscribeRewards();
        userData; // This looks like a leftover line. Ensure you correctly handle unsubscription or cleanup.
      };
    }
  }, [user]);

  console.log(achievements);
  console.log(userAchievements);

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
        {user && user.photoURL ? (
          <Image
            source={{ uri: user.photoURL }}
            style={GlobalStyles.profilePhoto}
          />
        ) : (
          <Text>Loading...</Text>
        )}
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          Hello, {user ? `${user.displayName}` : "Loading..."}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
          Achievements
        </Text>
        {Object.values(achievements)
          .filter((_, index) => userAchievements[index]) // Filter to include only if userAchievements[index] is true
          .map((achievement, index) => (
            <View
              key={index}
              style={{
                width: contentWidth,
                margin: 10,
                padding: 10,
                border: "1px solid #ccc",
                borderRadius: 5,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {achievement.title}
              </Text>
              <Text>{achievement.description}</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default Statistics;
