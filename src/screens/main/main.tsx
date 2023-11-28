import React from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import styles from "./main.styles";
const tokyoRegion = {
  latitude: 50.0647,
  longitude: 19.945,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const SettingsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={tokyoRegion}>
        <Marker coordinate={tokyoRegion} />
      </MapView>
    </View>
  );
};

export default SettingsScreen;
