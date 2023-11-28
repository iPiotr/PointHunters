import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import colors from "../../utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "./profileCard.styles";

import { GlobalStyles } from "@components";

const randomImageUrl = "https://picsum.photos/00";

const Profile: React.FC = ({ navigation }) => {
  return (
    <View style={GlobalStyles.container}>
      <View style={[GlobalStyles.topBar, styles.topBarSpec]}>
        <Ionicons name="arrow-back" size={28} color="black" />
        <Text style={{ fontSize: 22 }}>Profile</Text>
      </View>
      <View style={styles.title}>
        <Image
          source={{ uri: randomImageUrl }}
          style={GlobalStyles.profilePhoto}
        />
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>Piotr Starzec</Text>
        <Ionicons name="md-pencil-sharp" size={28} color="black" />
      </View>

      <Text style={styles.options}>Options</Text>
      <View style={styles.settingsContainer}>
        <TouchableOpacity
          style={styles.settingBlock}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Ionicons name="md-settings" size={36} color="black" />
          <Text>Account settings</Text>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingBlock}>
          <Ionicons name="ribbon" size={36} color="black" />
          <Text>Account card</Text>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingBlock}>
          <Ionicons name="md-help-sharp" size={36} color="black" />
          <Text>Help Center</Text>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
