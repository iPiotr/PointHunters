import React, { useState } from "react";
import {
  Image,
  TextInput,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { StackScreenProps } from "@react-navigation/stack";

import styles from "./singIn.styles";
import colors from "../../utils/colors";
import { BlockWithShadow, GlobalStyles, RoundButton } from "@components";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const buttonWidth = screenWidth * 0.9;

const auth = getAuth();

type RootStackParamList = {
  SignIn: undefined; // No parameters for the SignIn route
  SignUp: undefined; // No parameters for the SignUp route
};

type SignInScreenProps = StackScreenProps<RootStackParamList, "SignIn">;

function SignInScreen({ navigation }: SignInScreenProps) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    error: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const signIn = async () => {
    const { email, password } = credentials;

    if (!email || !password) {
      setCredentials({
        ...credentials,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof Error) {
        setCredentials({
          ...credentials,
          error: error.message,
        });
      } else {
        // Handle other types of errors or set a generic error message
        setCredentials({
          ...credentials,
          error: "An unexpected error occurred.",
        });
      }
    }
  };

  return (
    <View style={GlobalStyles.container}>
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
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                value={credentials.email}
                onChangeText={(text) =>
                  setCredentials({ ...credentials, email: text.trimEnd() })
                }
                style={[styles.input, GlobalStyles.topBarShadow]}
              />

              <TextInput
                placeholder="Password"
                onChangeText={(text) =>
                  setCredentials({ ...credentials, password: text })
                }
                secureTextEntry={!passwordVisible}
                style={[styles.input, GlobalStyles.topBarShadow]}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={styles.icon}
              >
                <Ionicons
                  name={passwordVisible ? "eye-off" : "eye"}
                  size={24}
                  color="grey"
                />
              </TouchableOpacity>
            </View>
            <RoundButton
              onPress={signIn}
              title="Log in"
              buttonWidth={buttonWidth}
              backgroundColor={colors.secondary}
            />
            <RoundButton
              onPress={() => navigation.navigate("SignUp")}
              title="Don't Have an account? Sign Up"
              buttonWidth={buttonWidth}
              backgroundColor={colors.accent}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default SignInScreen;
