import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "./profile.styles";
import colors from "../../utils/colors";
import {
  GlobalStyles,
  BlockWithShadow,
  UserType,
  ProfileOptionsProps,
  FullScreenModalProps,
} from "@components";
import { fetchUserById, updateUserById } from "../../services/firebaseService";

type ValidIconNames =
  | "md-settings"
  | "ribbon"
  | "md-help-sharp"
  | "arrow-forward";

interface OptionButtonProps {
  iconName: ValidIconNames;
  label: string;
  onPress: () => void;
}

const RANDOM_IMAGE_URL = "https://picsum.photos/00";
const USER_ID = 1;

const FullScreenModal: React.FC<FullScreenModalProps> = ({
  content,
  isVisible,
  onClose,
  setFullScreenVisible,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.fullScreenModalContainer}
        activeOpacity={1}
        onPress={() => setFullScreenVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
          style={styles.modalContent}
        >
          <Text>{content}</Text>
          <TouchableOpacity onPress={() => setFullScreenVisible(false)}>
            {/* <Text>Close</Text> */}
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const OptionButton: React.FC<OptionButtonProps> = ({
  iconName,
  label,
  onPress,
}) => (
  <TouchableOpacity
    activeOpacity={0.9}
    style={styles.settingBlock}
    onPress={onPress}
  >
    <BlockWithShadow
      width="100%"
      borderRadius={10}
      flexDirection={"row"}
      alignItems={"center"}
      padding={10}
    >
      <Ionicons name={iconName} size={36} color="black" />
      <Text>{label}</Text>
      <Ionicons name="arrow-forward" size={24} color="black" />
    </BlockWithShadow>
  </TouchableOpacity>
);

const ProfileOptions: React.FC<ProfileOptionsProps> = ({
  isFullScreenVisible,
  setFullScreenVisible,
  setSelectedContent,
}) => {
  return (
    <View style={styles.settingsContainer}>
      <Text style={styles.options}>Options</Text>
      <OptionButton
        iconName="md-settings"
        label="Account settings"
        onPress={() => {
          setSelectedContent("Account settings");
          setFullScreenVisible(true);
        }}
      />
      <OptionButton
        iconName="ribbon"
        label="Account card"
        onPress={() => {
          setSelectedContent("Account card");
          setFullScreenVisible(true);
        }}
      />
      <OptionButton
        iconName="md-help-sharp"
        label="Help Center"
        onPress={() => {
          setSelectedContent("Help Center");
          setFullScreenVisible(true);
        }}
      />
    </View>
  );
};

const Profile: React.FC = () => {
  const [isFullScreenVisible, setFullScreenVisible] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");
  const [user, setUser] = useState<UserType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");

  useEffect(() => {
    fetchUserById(USER_ID, (userData: UserType | null) => {
      if (userData) {
        setUser(userData);
        setEditedName(userData.name);
        setEditedLastName(userData.lastName);
      }
    });
  }, []);

  const handleSave = () => {
    const updatedUserData = {
      id: USER_ID,
      name: editedName,
      lastName: editedLastName,
    };
    updateUserById(USER_ID, updatedUserData);
    setIsEditing(false);
  };

  return (
    <View style={GlobalStyles.container}>
      <FullScreenModal
        content={selectedContent}
        isVisible={isFullScreenVisible}
        onClose={() => setFullScreenVisible(false)}
        setFullScreenVisible={setFullScreenVisible}
      />

      <View style={[GlobalStyles.topBar, styles.topBarSpec]}>
        <Ionicons name="arrow-back" size={28} color={colors.black} />
        <Text style={{ fontSize: 22 }}>Profile</Text>
      </View>
      <View style={styles.title}>
        <Image
          source={{ uri: RANDOM_IMAGE_URL }}
          style={GlobalStyles.profilePhoto}
        />
        {isEditing ? (
          <>
            <TextInput
              value={editedName}
              onChangeText={setEditedName}
              placeholder="Name"
              style={styles.changeInput}
            />
            <TextInput
              value={editedLastName}
              onChangeText={setEditedLastName}
              placeholder="Last Name"
              style={styles.changeInput}
            />
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={() => setIsEditing(false)} />
          </>
        ) : (
          <>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
              {user ? `${user.name} ${user.lastName}` : "Loading..."}
            </Text>
            <Ionicons
              name="md-pencil-sharp"
              size={28}
              color="black"
              onPress={() => setIsEditing(true)}
            />
          </>
        )}
      </View>

      <ProfileOptions
        isFullScreenVisible={isFullScreenVisible}
        setFullScreenVisible={setFullScreenVisible}
        setSelectedContent={setSelectedContent}
      />
    </View>
  );
};

export default Profile;
