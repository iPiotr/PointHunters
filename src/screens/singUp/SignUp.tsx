import React, { useState } from "react"; // Used destructuring for useState
import {
  Image,
  TextInput,
  View,
  Dimensions,
  ImageBackground,
  Alert,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  fetchUserById,
  updateUserById,
  addUserToDatabase,
} from "../../services/firebaseService";
import { StackScreenProps } from "@react-navigation/stack";

import colors from "../../utils/colors";
import styles from "./singUp.styles";
import { RoundButton, Credentials } from "@components";

const auth = getAuth();

type RootStackParamList = {
  SignIn: undefined; // No parameters for the SignIn route
  SignUp: undefined; // No parameters for the SignUp route
};

type SignUpScreenProps = StackScreenProps<RootStackParamList, "SignUp">;

function SignUpScreen({ navigation }: SignUpScreenProps) {
  const [credentials, setCredentials] = useState<Credentials>({
    name: "",
    lastName: "",
    email: "",
    password: "",
    error: "",
  });

  const inputFields = [
    { placeholder: "Name", key: "name" },
    { placeholder: "Last Name", key: "lastName" },
    { placeholder: "Email", key: "email" },
    { placeholder: "Password", key: "password", isSecure: true },
  ];

  const signUp = async () => {
    const { email, password, name, lastName } = credentials;

    let missingFields = []; // Array to store the names of missing fields

    if (!name) missingFields.push("Name");
    if (!lastName) missingFields.push("Last Name");
    if (!email) missingFields.push("Email");
    if (!password) missingFields.push("Password");

    if (missingFields.length > 0) {
      // If there are missing fields, show an alert
      Alert.alert(
        "Missing Fields",
        `Please fill in the following fields: ${missingFields.join(", ")}`,
        [{ text: "OK" }]
      );
      return;
    }

    if (!email || !password || !name || !lastName) {
      setCredentials({
        ...credentials,
        error: "All fields are mandatory.",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      addUserToDatabase({ email, name, lastName }); // Add the user to the database
      navigation.navigate("SignIn");
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
          {inputFields.map((field) => (
            <TextInput
              key={field.key}
              placeholder={field.placeholder}
              value={credentials[field.key]}
              onChangeText={(text) =>
                setCredentials((prev) => ({ ...prev, [field.key]: text }))
              }
              secureTextEntry={field.isSecure}
              style={styles.input}
            />
          ))}
          <RoundButton
            onPress={signUp}
            title="Sign Up"
            buttonWidth={buttonWidth}
            backgroundColor={colors.secondary}
          />
          <RoundButton
            onPress={() => navigation.navigate("SignIn")}
            title="Have an account? Sign in"
            buttonWidth={buttonWidth}
            backgroundColor={colors.accent}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const screenWidth = Dimensions.get("window").width;
const buttonWidth = screenWidth * 0.9;

export default SignUpScreen;
