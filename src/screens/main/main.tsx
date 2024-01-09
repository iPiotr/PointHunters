import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  SafeAreaView,
  Modal,
  Button,
  Image,
  ImageBackground,
  TextInput,
} from "react-native";

import {
  incrementWin,
  addNewPost,
  fetchUserById,
  fetchAchievements,
  fetchUserAchievements,
  updateUserAchievements,
  addNotification,
} from "../../services/firebaseService";

import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import polyline from "@mapbox/polyline";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { GlobalStyles, RoundButton, UserType } from "@components";
import { calculateDistance, calculateNewLocation } from "./main.utils";
import colors from "../../utils/colors";
import styles from "./main.styles";

import useAuth from "../../FirebaseAuth/useAuth";

export default function App() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [endCoordinate, setEndCoordinate] = useState(null);
  const [distance, setDistance] = useState(0);
  const [score, setScore] = useState(0);
  const [showPostCreation, setShowPostCreation] = useState(false);
  // const [userData, setUserData] = useState(null);
  const [distanceBetweenPoints, setDistanceBetweenPoints] = useState(200);
  const [pointsAmount, setPointsAmounts] = useState(2);

  const [isStarted, setIsStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const USER_ID = 1;

  const { user } = useAuth();

  const startGame = async () => {
    console.log(distanceBetweenPoints);
    console.log(pointsAmount);
    setDistanceBetweenPoints(distanceBetweenPoints);
    setPointsAmounts(pointsAmount);

    setIsStarted(true);
    // Any additional logic to start the game, e.g., setting up location tracking
  };

  //TODO FIRST-DESTINATION

  useEffect(() => {
    if (!isStarted || gameOver) return;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setLoading(false);
        return;
      }

      // Fetch initial location
      const initialLocation = await Location.getCurrentPositionAsync({});
      setCurrentLocation(initialLocation);

      // Function to generate a new destination
      const generateDestination = (latitude, longitude) => {
        return calculateNewLocation(
          latitude,
          longitude,
          3, // Adjust the distance as needed
          Math.random() * 2 * Math.PI
        );
      };

      console.log(generateDestination);

      // Set endCoordinate with retries
      let retryCount = 0;
      let maxRetries = 10; // Set a maximum number of retries
      let newDestination = generateDestination(
        initialLocation.coords.latitude,
        initialLocation.coords.longitude
      );

      console.log(newDestination);

      while (!newDestination && retryCount < maxRetries) {
        newDestination = generateDestination(
          initialLocation.coords.latitude,
          initialLocation.coords.longitude
        );

        retryCount++;
        console.log(retryCount);
      }
      console.log(newDestination);

      if (newDestination) {
        setEndCoordinate(newDestination);
      } else {
        console.log("Failed to generate endCoordinate after retries");
        // Handle the failure case appropriately
      }

      setLoading(false); // Set loading to false only after both current location and endCoordinate are set
    })();
  }, [isStarted, gameOver]);

  //TODO FIRST-DESTINATION

  //TODO CHECK-DESTINATION/NEW-DESTINATION

  useEffect(() => {
    if (gameOver) return; // If the game is over, exit the effect early.
    let subscription;

    const startLocationUpdates = async () => {
      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 7000,
          distanceInterval: 10,
        },
        (newLocation) => {
          setCurrentLocation(newLocation);
          if (endCoordinate) {
            updateRoute(newLocation, endCoordinate);
          }
        }
      );
    };

    if (endCoordinate) {
      startLocationUpdates();
    }

    if (currentLocation && endCoordinate) {
      const distance = calculateDistance(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude,
        endCoordinate.latitude,
        endCoordinate.longitude
      );
      setDistance(distance);

      if (distance <= 5) {
        try {
          const newEndCoords = calculateNewLocation(
            currentLocation.coords.latitude,
            currentLocation.coords.longitude,
            distanceBetweenPoints,
            Math.random() * 2 * Math.PI
          );
          setEndCoordinate(newEndCoords); // Set new end coordinates
          setScore((prevScore) => prevScore + 1);
        } catch (error) {
          console.error(
            "Error updating score or setting new end coordinates:",
            error
          );
        }
      } else {
      }
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [currentLocation, endCoordinate, gameOver]);

  //TODO CHECK-DESTINATION/NEW-DESTINATION

  const updateRoute = async (currentLoc, destination) => {
    const points = await getDirections(
      `${currentLoc.coords.latitude},${currentLoc.coords.longitude}`,
      `${destination.latitude},${destination.longitude}`
    );
    setRouteCoordinates(points);
  };

  const getDirections = async (startLoc, destinationLoc) => {
    try {
      const apiKey = "AIzaSyDSj3cHx7G4r19ug35-KfYNaYTiZpgNH5M"; // Replace with your actual API key
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${apiKey}`
      );
      const jsonResponse = await response.json();

      if (jsonResponse.status !== "OK" || !jsonResponse.routes.length) {
        console.error("No routes found or API error:", jsonResponse.status);
        return []; // Return an empty array in case of error or no routes
      }
      const route = polyline.decode(
        jsonResponse.routes[0].overview_polyline.points
      );
      return route.map((point) => ({
        latitude: point[0],
        longitude: point[1],
      }));
    } catch (error) {
      console.error("Error fetching directions:", error);
      return []; // Return an empty array in case of error
    }
  };

  let text = "Waiting..";
  let initialRegion = null;

  if (errorMsg) {
    text = errorMsg;
  } else if (currentLocation) {
    initialRegion = {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
  }

  const renderGameOverModal = () => (
    <Modal
      visible={gameOver && !showPostCreation}
      transparent={true}
      onRequestClose={() => setGameOver(false)}
    >
      <View style={GlobalStyles.centeredView}>
        <View style={[styles.modalView, GlobalStyles.topBarShadow]}>
          <Text style={styles.modalText}>You Win!</Text>
          <Text style={styles.createButton} onPress={handleCreatePost}>
            Create Post
          </Text>
          <MaterialCommunityIcons
            name="close-circle-outline"
            size={36}
            color="black"
            onPress={() => restartGame()}
            style={styles.closeIcon}
          />
        </View>
      </View>
    </Modal>
  );

  const renderPostCreationModal = () => (
    <Modal
      visible={showPostCreation}
      transparent={true}
      onRequestClose={() => setShowPostCreation(false)}
    >
      <View style={GlobalStyles.centeredView}>
        <View style={[styles.modalView, GlobalStyles.topBarShadow]}>
          <Text>I scored {score} points!</Text>
          <Image
            source={{ uri: "https://picsum.photos/000" }}
            style={styles.mapImage}
          />
          <Button title="Publish" onPress={handlePublish} />
        </View>
      </View>
    </Modal>
  );
  const [achievements, setAchievements] = useState({});
  const [userAchievements, setUserAchievements] = useState([]);
  const [userData, setUser] = useState<UserType | null>(null);

  // useEffect(() => {
  //   if (score === pointsAmount) {
  //     setGameOver(true);
  //     incrementWin(user.uid, score);

  //     const unsubscribeAchievements = fetchAchievements(setAchievements);
  //     const unsubscribeUserAchievements = fetchUserAchievements(
  //       user.uid,
  //       setUserAchievements
  //     );
  //     console.log(achievements);
  //     console.log(userAchievements);
  //   }
  // }, [score]);

  useEffect(() => {
    if (user && user.uid) {
      if (score === pointsAmount) {
        setGameOver(true);
        incrementWin(user.uid, score);

        const unsubscribeAchievements = fetchAchievements((data) => {
          console.log("Fetched achievements:", data);
          setAchievements(data);
        });
        const unsubscribeUserAchievements = fetchUserAchievements(
          user.uid,
          setUserAchievements
        );
        fetchUserById(user.uid, (userData: UserType | null) => {
          if (userData) {
            console.log("User data fetched:", userData);
            setUser(userData);
          } else {
            console.log("No user data found for UID:", user.uid);
          }
        });
        updateUserAchievements(user.uid, userData, achievements);

        console.log(achievements);
        console.log(userAchievements);
        console.log("User data fetched:", userData);

        return () => {
          unsubscribeAchievements();
          unsubscribeUserAchievements();
          userData;
        };
      }
    }
  }, [user, score]);

  const handleCreatePost = () => {
    setShowPostCreation(true);
  };

  const handlePublish = () => {
    if (user) {
      const newPost = {
        who: user.displayName,
        comment: `I scored ${score} points!`,
        photo: "https://picsum.photos/000",
        likes: 0,
      };

      addNewPost(newPost);
      addNotification(user.uid, "You publish post", "post");
      // Logic to handle post publishing
      setShowPostCreation(false);
      restartGame();
    }
  };

  const restartGame = () => {
    setScore(0); // Reset the score
    setGameOver(false); // Set the game to not be over
    setIsStarted(false); // Set the game to not started
    // Reset other necessary states like currentLocation, endCoordinate, distance, etc.
    // You may also want to re-fetch the initial location or set a new destination here
  };

  let scoreToDisplay = `numeric-${score}-box`;
  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        isStarted && (
          <View style={styles.container}>
            <View style={styles.gameTopBar}>
              <View style={GlobalStyles.box}></View>
              <View style={GlobalStyles.box}>
                <Text style={{ fontSize: 20 }}>{distance.toFixed(0)} m</Text>
              </View>
              <View style={GlobalStyles.box}>
                <Text style={{ fontSize: 20 }}>
                  <Text>
                    <MaterialCommunityIcons
                      name={scoreToDisplay}
                      size={36}
                      color="black"
                    />
                  </Text>
                </Text>
              </View>
            </View>

            <MapView style={styles.map} initialRegion={initialRegion}>
              <Polyline
                coordinates={routeCoordinates}
                strokeWidth={4}
                strokeColor="red"
              />
              {currentLocation && (
                <Marker
                  coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                  }}
                  anchor={{ x: 0.5, y: 0.5 }}
                >
                  <View style={styles.radius}>
                    <View style={styles.marker} />
                  </View>
                </Marker>
              )}
              {endCoordinate && <Marker coordinate={endCoordinate} />}
            </MapView>
          </View>
        )
      )}
      {renderGameOverModal()}
      {renderPostCreationModal()}
      {!isStarted && (
        <ImageBackground
          source={require("@assets/background.png")}
          style={styles.background}
        >
          <View style={GlobalStyles.centeredView}>
            <View style={[styles.modalView, GlobalStyles.topBarShadow]}>
              <Text>Distance between points (m)</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setDistanceBetweenPoints(Number(text))}
                value={String(distanceBetweenPoints)}
                keyboardType="numeric"
                placeholder="Enter distance between points"
              />
              <Text>Points to earn</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setPointsAmounts(Number(text))}
                value={String(pointsAmount)}
                keyboardType="numeric"
                placeholder="Enter points amount"
              />
              <RoundButton
                onPress={startGame}
                title="Start Game"
                buttonWidth={200}
                backgroundColor={colors.secondary}
              />
            </View>
          </View>
        </ImageBackground>
      )}
    </SafeAreaView>
  );
}
