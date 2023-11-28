import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Platform, View, useColorScheme } from "react-native";

import "./src/config/firebase";
import RootNavigation from "./src/navigation";
import { useFonts } from "expo-font";

import colors from "./src/utils/colors";

import {
  community,
  notifications,
  main,
  statistics,
  profile,
} from "./src/screens";

import AppNavigator from "./src/components/AppNavigator";

const Tab = createBottomTabNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loaded] = useFonts({});

  if (!loaded) {
    return;
  }

  return <RootNavigation />;

  // return isLoggedIn ? (
  //   <NavigationContainer>
  //     <AppNavigator />
  //   </NavigationContainer>
  // ) : (
  //   <Login onLogin={() => setIsLoggedIn(true)} />
  // );
};

export default App;
