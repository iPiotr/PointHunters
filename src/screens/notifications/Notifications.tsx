import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "./notifications.styles";

import {
  GlobalStyles,
  BlockWithShadow,
  RewardItem,
  AchievementItem,
  Achievements,
  Rewards,
} from "@components";
import useAuth from "../../FirebaseAuth/useAuth";
import { fetchNotifications } from "../../services/firebaseService";

const randomImageUrl = "https://picsum.photos/000";

const like1 = {
  who: "piotr.s",
  text: "liked your post",
  photo: randomImageUrl,
};
const like2 = {
  who: "piotr.s",
  text: "liked your post",
  photo: randomImageUrl,
};
const like3 = {
  who: "piotr.s",
  text: "liked your post",
  photo: randomImageUrl,
};
const likeArray = [like1, like2, like3];

const Notifications: React.FC = () => {
  const [userNotifications, setUserNotyfications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.uid) {
      // Check if user is not null and has a uid
      const unsubscribeNotifications = fetchNotifications(
        user.uid,
        setUserNotyfications
      );

      return () => {
        unsubscribeNotifications();
      };
    }
  }, [user]);
  const userNotificationsArray = Object.values(userNotifications);
  // console.log(userNotifications);

  return (
    <View style={GlobalStyles.container}>
      <View
        style={[
          GlobalStyles.topBar,
          GlobalStyles.topBarShadow,
          { marginBottom: 10 },
        ]}
      >
        <Ionicons name="arrow-back" size={28} color="black" />
        <Text style={{ fontSize: 22 }}>Notifications</Text>
        <Ionicons name="ios-options" size={24} color="black" />
      </View>
      <ScrollView>
        <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 10 }}>
          Today
        </Text>
        {userNotificationsArray.map((notification, index) => (
          <BlockWithShadow
            key={index}
            width="90%"
            borderRadius={10}
            paddingLeft={10}
            padding={20}
          >
            <View
              style={{
                flexDirection: "row",
                paddingLeft: 10,
                alignItems: "center",
              }}
            >
              <Ionicons name="medal-outline" size={24} color="black" />
              <Text>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  {" "}
                  {notification.content} {notification.date}
                </Text>
              </Text>
              {/* <Image source={{ uri: like.photo }} style={styles.postPhoto} /> */}
            </View>
          </BlockWithShadow>
        ))}
        <View
          style={{
            height: 70,
            width: "100%",
            opacity: 0,
          }}
        ></View>
      </ScrollView>
    </View>
  );
};

export default Notifications;
