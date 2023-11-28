import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Platform, View, useColorScheme } from "react-native";

import colors from "../utils/colors";

import { community, notifications, main, statistics, profile } from "@screens";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const colorScheme = useColorScheme();

  const tabOptions = (marginRight: number, iconName: string) => {
    const colorScheme = useColorScheme();

    const backgroundColor = colorScheme === "dark" ? "#000" : "#fff";
    return {
      tabBarItemStyle: {
        backgroundColor: backgroundColor,
        marginRight: marginRight,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 10,
      },
      tabBarIconStyle: {
        marginBottom: -12, //TODO: find other way
        backgroundColor: "red",
      },
      headerShown: false,
      tabBarLabel: "",
      tabBarIcon: ({ focused }: { focused: boolean }) => {
        return (
          <View
            style={{
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.6,
              shadowRadius: 4,
              elevation: Platform.OS === "android" ? 5 : 0,
            }}
          >
            <Ionicons
              name={iconName as any}
              size={24}
              color={focused ? colors.secondary : "grey"}
            />
          </View>
        );
      },
    };
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "transparent",
          bottom: 20,
          left: 30,
          right: 30,
          borderRadius: 25,
          elevation: 48,
          borderBlockColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="Community"
        component={community}
        options={tabOptions(10, "albums")}
      />
      <Tab.Screen
        name="Notifications"
        component={notifications}
        options={tabOptions(10, "notifications")}
      />
      <Tab.Screen
        name="Home3"
        component={main}
        options={tabOptions(10, "map")}
      />
      <Tab.Screen
        name="HomeSett"
        component={statistics}
        options={tabOptions(10, "stats-chart")}
      />
      <Tab.Screen
        name="Profile"
        component={profile}
        options={tabOptions(0, "person-circle")}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
