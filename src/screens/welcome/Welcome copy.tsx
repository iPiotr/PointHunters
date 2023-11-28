import React from "react";
import { Text, Image, View, Dimensions, ImageBackground } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import styles from "./welcome.styles";
import colors from "../../utils/colors";
import { RoundButton } from "@components";

type WelcomeScreenProps = StackScreenProps<any, "Welcome">;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("@assets/background.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("@assets/logo_transparent.png")}
            style={styles.image}
          />
          <Text style={styles.title}>Point Hunters</Text>
          <Text style={styles.subtitle}>Move around with fun</Text>
        </View>
        <View style={styles.buttonContainer}>
          <RoundButton
            onPress={() => navigation.navigate("Sign In")}
            title="Log in"
            buttonWidth={buttonWidth}
            backgroundColor={colors.secondary}
          />
          <RoundButton
            onPress={() => navigation.navigate("Sign Up")}
            title="Sign up"
            buttonWidth={buttonWidth}
            backgroundColor={colors.accent}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const screenWidth = Dimensions.get("window").width;
const buttonWidth = screenWidth * 0.9;

export default WelcomeScreen;
