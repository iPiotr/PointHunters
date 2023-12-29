import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import polyline from "@mapbox/polyline";

import * as Location from "expo-location";

export default function App() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [endCoordinate, setEndCoordinate] = useState(null);

  const randomBearing = Math.random() * 2 * Math.PI;

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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setLoading(false);
        return;
      }

      let subscription;
      try {
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000, // Update every 5 seconds
            distanceInterval: 5, // Or update every 5 meters
          },
          async (newLocation) => {
            setCurrentLocation(newLocation);
            if (!endCoordinate) {
              const newDestination = calculateNewLocation(
                newLocation.coords.latitude,
                newLocation.coords.longitude,
                300,
                Math.random() * 2 * Math.PI
              );
              await updateRoute(newLocation, newDestination);
            }
          }
        );
      } catch (e) {
        console.error(e);
      }

      setLoading(false);

      return () => {
        if (subscription) {
          subscription.remove();
        }
      };
    })();
  }, [endCoordinate]);

  const updateRoute = async (currentLoc, destination) => {
    const points = await getDirections(
      `${currentLoc.coords.latitude},${currentLoc.coords.longitude}`,
      `${destination.latitude},${destination.longitude}`
    );
    setRouteCoordinates(points);
    if (points.length > 0) {
      const lastPoint = points[points.length - 1];
      setEndCoordinate(lastPoint);
    }
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

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : initialRegion ? (
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
            />
          )}
          {endCoordinate && <Marker coordinate={endCoordinate} />}
        </MapView>
      ) : (
        <Text>{text}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    height: "100%",
    width: "100%",
  },
});
