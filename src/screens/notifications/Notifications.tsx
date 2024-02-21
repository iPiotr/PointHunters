// @ts-nocheck
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "./notifications.styles";

import { GlobalStyles, BlockWithShadow } from "@components";
import useAuth from "../../FirebaseAuth/useAuth";
import { fetchNotifications } from "../../services/firebaseService";

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
            <View style={styles.notificationBlock}>
              <Ionicons name="medal-outline" size={24} color="black" />
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  {notification.content}
                </Text>
                <Text>{notification.date}</Text>
              </View>
            </View>
          </BlockWithShadow>
        ))}
      </ScrollView>
    </View>
  );
};

export default Notifications;
