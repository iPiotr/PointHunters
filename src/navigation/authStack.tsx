import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { welcome, singIn, singUp } from "@screens";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: "#0e1529",
          },
          headerShown: false,
        }}
      >
        {/* <Stack.Screen name="Welcome" component={welcome} /> */}
        <Stack.Screen name="SignIn" component={singIn} />
        <Stack.Screen name="SignUp" component={singUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
