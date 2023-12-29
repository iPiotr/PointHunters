import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  SafeAreaView,
  Modal,
  Button,
  TextInput,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import polyline from "@mapbox/polyline";
import { incrementWin } from "../../services/firebaseService";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { GlobalStyles, RoundButton } from "@components";

import colors from "../../utils/colors";

import * as Location from "expo-location";

export default function App() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [endCoordinate, setEndCoordinate] = useState(null);
  const [distance, setDistance] = useState(0);
  const [score, setScore] = useState(0);
  const [showPostCreation, setShowPostCreation] = useState(false);

  const [isStarted, setIsStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const USER_ID = 1;

  function calculateNewLocation(lat, lon, distance, bearing) {
    const EarthRadius = 6371; // Earth's radius in kilometers
    const dR = distance / 1000 / EarthRadius; // Convert distance to radians
    const latitude1 = (lat * Math.PI) / 180; // Convert latitude to radians
    const longitude1 = (lon * Math.PI) / 180; // Convert longitude to radians

    const newLatitude = Math.asin(
      Math.sin(latitude1) * Math.cos(dR) +
        Math.cos(latitude1) * Math.sin(dR) * Math.cos(bearing)
    );
    const newLongitude =
      longitude1 +
      Math.atan2(
        Math.sin(bearing) * Math.sin(dR) * Math.cos(latitude1),
        Math.cos(dR) - Math.sin(latitude1) * Math.sin(newLatitude)
      );

    return {
      latitude: (newLatitude * 180) / Math.PI,
      longitude: (newLongitude * 180) / Math.PI,
    };
  }

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // Distance in meters
  };

  const startGame = async () => {
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
            200,
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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>You Win!</Text>
          <Button title="Create Post" onPress={handleCreatePost} />
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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>I scored {score} points!</Text>
          {/* <Image
            source={{ uri: "random_map_image_url" }}
            style={styles.mapImage}
          /> */}
          {/* Replace 'random_map_image_url' with your image URL */}
          <TextInput style={styles.textInput} placeholder="Add a caption..." />
          <Button title="Publish" onPress={handlePublish} />
        </View>
      </View>
    </Modal>
  );

  useEffect(() => {
    if (score === 2) {
      setGameOver(true);
      incrementWin(USER_ID);
    }
  }, [score]);

  const handleCreatePost = () => {
    setShowPostCreation(true);
  };

  const handlePublish = () => {
    // Logic to handle post publishing
    setShowPostCreation(false);
    restartGame();
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
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        isStarted && (
          <View style={styles.container}>
            <View style={styles.topBar}>
              <View style={styles.box}></View>
              <View style={styles.box}>
                <Text style={styles.distanceText}>{distance.toFixed(0)} m</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.messageText}>
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>You Win!</Text> */}
            <RoundButton
              onPress={startGame}
              title="Start Game"
              buttonWidth={200}
              backgroundColor={colors.secondary}
            />
          </View>
        </View>
        // <Button title="Start Game" onPress={startGame} /> // Add the Start Button
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  topBar: {
    marginTop: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
    backgroundColor: "rgba(165, 90, 214, 0.3)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginHorizontal: 2,
  },
  map: {
    flex: 1,
    width: "100%",
  },
  distanceText: {
    fontSize: 20,
    color: "black",
  },
  messageText: {
    fontSize: 20,
    color: "black",
  },
  radius: {
    height: 40,
    width: 40,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "rgba(156, 69, 214, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(165, 90, 214, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: "#9c45d6",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  modalView: {
    margin: 40,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(165, 90, 214, 0.3)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24,
  },
  mapImage: {
    width: 200,
    height: 100,
    marginBottom: 15,
  },
  textInput: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
  },
});
