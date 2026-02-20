import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import "./src/config/firebase";
import RootNavigation from "./src/navigation";
import { useFonts } from "expo-font";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

const Tab = createBottomTabNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loaded] = useFonts({});

  if (!loaded) {
    return;
  }

  return <RootNavigation />;
};

export default App;
