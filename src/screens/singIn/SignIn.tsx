import React, { useState } from "react";
import {
  Image,
  TextInput,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { StackScreenProps } from "@react-navigation/stack";

import styles from "./singIn.styles";
import colors from "../../utils/colors";
import { RoundButton } from "@components";

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
          <TextInput
            placeholder="Email"
            value={credentials.email}
            onChangeText={(text) =>
              setCredentials({ ...credentials, email: text })
            }
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            onChangeText={(text) =>
              setCredentials({ ...credentials, password: text })
            }
            secureTextEntry={true}
            style={styles.input}
          />
          <RoundButton
            onPress={signIn}
            title="Log in"
            buttonWidth={buttonWidth}
            backgroundColor={colors.secondary}
          />
          <RoundButton
            onPress={() => navigation.navigate("SignUp")}
            title="Don't Have an account? Sign Up" // Fixed typo in title
            buttonWidth={buttonWidth}
            backgroundColor={colors.accent}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

export default SignInScreen;
