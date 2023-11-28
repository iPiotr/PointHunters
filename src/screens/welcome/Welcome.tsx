import React from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import styles from "../main/main.styles";
const tokyoRegion = {
  latitude: 50.0647,
  longitude: 19.945,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const tokyoRegion2 = {
  latitude: 52.0647,
  longitude: 19.945,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const GOOGLE_MAPS_APIKEY = "AIzaSyDSj3cHx7G4r19ug35-KfYNaYTiZpgNH5M";

const SettingsScreen: React.FC = () => {
  return (
    <View>
      <MapView style={styles.map} initialRegion={tokyoRegion}></MapView>
    </View>
  );
};

export default SettingsScreen;
//AIzaSyA8E5S5bjuG_zSBAHfJjiUakQIovq9w7uY

//AIzaSyDSj3cHx7G4r19ug35-KfYNaYTiZpgNH5M

//Troubleshooting info:
//   Principal: ip.starzec@gmail.com
//   Resource: pointhunters-6148d
//   Troubleshooting URL: console.cloud.google.com/iam-admin/troubleshooter;permissions=resourcemanager.projects.get;principal=ip.starzec@gmail.com;resources=%2F%2Fcloudresourcemanager.googleapis.com%2Fprojects%2Fpointhunters-6148d/result

// Missing permissions:
//   resourcemanager.projects.get
