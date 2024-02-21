import React, { useState } from "react"; // Used destructuring for useState
import {
  Image,
  TextInput,
  View,
  Dimensions,
  ImageBackground,
  Alert,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  fetchUserById,
  updateUserById,
  addUserToDatabase,
  initializeUserRewards,
} from "../../services/firebaseService";
import { StackScreenProps } from "@react-navigation/stack";

import colors from "../../utils/colors";
import styles from "../singIn/singIn.styles";
import { RoundButton, Credentials, GlobalStyles } from "@components";
import useAuth from "../../FirebaseAuth/useAuth";

type RootStackParamList = {
  SignIn: undefined; // No parameters for the SignIn route
  SignUp: undefined; // No parameters for the SignUp route
};

type SignUpScreenProps = StackScreenProps<RootStackParamList, "SignUp">;

function SignUpScreen({ navigation }: SignUpScreenProps) {
  const screenWidth = Dimensions.get("window").width;
  const buttonWidth = screenWidth * 0.9;

  const { user } = useAuth();

  const [credentials, setCredentials] = useState<Credentials>({
    displayName: "",
    email: "",
    password: "",
    pointsCollected: "",
    huntTimes: "",
    error: "",
  });

  const inputFields = [
    { placeholder: "Dsiplay name", key: "displayName" },
    { placeholder: "Profile photo url", key: "profilePhoto" },
    { placeholder: "Email", key: "email" },
    { placeholder: "Password", key: "password", isSecure: true },
  ];

  const signUp = async () => {
    const huntTimes = 0;
    const pointsCollected = 0;
    const { email, password, displayName } = credentials;

    let missingFields = []; // Array to store the names of missing fields

    if (!displayName) missingFields.push("Name");
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

    if (!email || !password || !displayName) {
      setCredentials({
        ...credentials,
        error: "All fields are mandatory.",
      });
      return;
    }

    // try {
    //   await createUserWithEmailAndPassword(auth, email, password);
    //   await addUserToDatabase({
    //     email,
    //     displayName,
    //     uid,
    //     huntTimes: 0,
    //     pointsCollected: 0,
    //   }); // Add the user to the database
    //   navigation.navigate("SignIn");
    // } catch (error) {
    //   if (error instanceof Error) {
    //     setCredentials({
    //       ...credentials,
    //       error: error.message,
    //     });
    //   } else {
    //     // Handle other types of errors or set a generic error message
    //     setCredentials({
    //       ...credentials,
    //       error: "An unexpected error occurred.",
    //     });
    //   }
    // }

    try {
      const auth = getAuth();

      // Create a new user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const uid = user.uid;
      console.log(uid);

      addUserToDatabase({
        email,
        displayName,
        uid,
        pointsCollected,
        huntTimes,
      }); // Add the user to the database

      // Update the user profile
      try {
        await updateProfile(user, {
          displayName: credentials.displayName,
          //add a photoURL
          photoURL:
            "https://fastly.picsum.photos/id/351/3994/2443.jpg?hmac=XefBGGaGQ_g2n6aGblkqlhZ2ZXWMWZ9FGDz81BWkfXk",
        });
        console.log("User profile updated:", credentials.name);
      } catch (error) {
        console.error("Error update user:", error);
      }

      console.log("User registered and profile updated:", user);
      navigation.navigate("SignIn");
    } catch (error) {
      console.error("Error registering new user:", error);
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
            {inputFields.map((field) => (
              <TextInput
                key={field.key}
                placeholder={field.placeholder}
                value={credentials[field.key]}
                onChangeText={(text) =>
                  setCredentials((prev) => ({
                    ...prev,
                    [field.key]: text.trimEnd(),
                  }))
                }
                secureTextEntry={field.isSecure}
                style={[styles.input, GlobalStyles.topBarShadow]}
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
    </View>
  );
}

export default SignUpScreen;
