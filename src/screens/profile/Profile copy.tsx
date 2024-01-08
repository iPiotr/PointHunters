import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Linking,
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
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase";
import useAuth from "../../FirebaseAuth/useAuth";
import {
  fetchUserById,
  updateUserById,
  updateNameById,
} from "../../services/firebaseService";

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

const EditField = ({ label, value, onChangeText, onSave, onCancel }) => (
  <View style={styles.editRow}>
    <Text style={{ fontSize: 22, fontWeight: "bold" }}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={styles.changeInput}
    />
    <Ionicons
      name="save-outline"
      size={28}
      color={colors.black}
      onPress={onSave}
    />
    <Ionicons
      name="close-circle"
      size={28}
      color={colors.black}
      onPress={onCancel}
    />
  </View>
);

const SettingTitle = ({ title, onPress }) => (
  <View style={styles.editRow}>
    <Text style={{ fontSize: 22, fontWeight: "bold" }} onPress={onPress}>
      {title}
    </Text>
    <Ionicons name="arrow-back" size={28} color="black" onPress={onPress} />
  </View>
);

const FullScreenModal: React.FC<FullScreenModalProps> = ({
  content,
  isVisible,
  onClose,
  setFullScreenVisible,
  isEditing,
  setIsEditing,
  editedName,
  setEditedName,
  handleSave,
  isEditingName,
  setIsEditingName,
  isEditingEmail,
  setIsEditingEmail,
  isEditingPassword,
  setIsEditingPassword,
}) => {
  const { user } = useAuth();

  const renderContent = (content) => {
    switch (content) {
      case "Account settings":
        return (
          <View>
            {isEditingName ? (
              <EditField
                label="Change Name"
                value={editedName}
                onChangeText={setEditedName}
                onSave={() => {
                  /* handle name save */
                }}
                onCancel={() => setIsEditingName(false)}
              />
            ) : (
              <SettingTitle
                title="Change Name"
                onPress={() => setIsEditingName(true)}
              />
            )}
            <SettingTitle
              title="Change Email"
              onPress={() => {
                /* Handle Email Change */
              }}
            />
            <SettingTitle
              title="Change Password"
              onPress={() => {
                /* Handle Password Change */
              }}
            />
          </View>
        );
      case "Account card":
        return <View>{/* Content for Account card */}</View>;
      case "Help Center":
        return (
          <Button
            onPress={() => Linking.openURL("mailto:support@example.com")}
            title="Contact Support"
            color={colors.primary}
          />
        );
      case "Logout":
        return (
          <Button
            onPress={() => signOut(auth)}
            title="Logout"
            color={colors.danger}
          />
        );
      default:
        return (
          <View>
            <Text>Content not found</Text>
          </View>
        );
    }
  };

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
          {renderContent(content)}
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
  auth,
}) => {
  const handleLogout = async () => {
    await signOut(auth);
  };

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
      <OptionButton
        iconName="md-help-sharp"
        label="Logout"
        onPress={handleLogout}
      />
    </View>
  );
};

const Profile: React.FC = () => {
  const [isFullScreenVisible, setFullScreenVisible] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");
  const [userData, setUser] = useState<UserType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    if (userData && userData.uid) {
      fetchUserById(USER_ID, (userData: UserType | null) => {
        if (userData) {
          setUser(userData);
          setEditedName(userData.name);
          setEditedLastName(userData.lastName);
        }
      });
    }
  }, []);

  const handleSave = async () => {
    try {
      await updateProfile(user, {
        displayName: editedName,
      });

      setIsEditing(false);
      console.log("User profile updated:", user.displayName);
    } catch (error) {
      console.error("Error update user:", error);
    }

    updateNameById(user.uid, editedName);
  };

  return (
    <View style={GlobalStyles.container}>
      <FullScreenModal
        content={selectedContent}
        isVisible={isFullScreenVisible}
        onClose={() => setFullScreenVisible(false)}
        setFullScreenVisible={setFullScreenVisible}
        isEditingName={isEditingName} // Pass the state
        setIsEditingName={setIsEditingName} // Pass the setter
        isEditingEmail={isEditingEmail} // Similarly for email
        setIsEditingEmail={setIsEditingEmail} // And its setter
        isEditingPassword={isEditingPassword} // Similarly for password
        setIsEditingPassword={setIsEditingPassword} // And its setter
        editedName={editedName}
        setEditedName={setEditedName}
        handleSave={handleSave}
        isEditing={isEditing}
      />

      <View style={[GlobalStyles.topBar, styles.topBarSpec]}>
        <Ionicons name="arrow-back" size={28} color={colors.black} />
        <Text style={{ fontSize: 22 }}>Profile</Text>
      </View>
      <View style={styles.title}>
        <Image
          source={user ? { uri: user.photoURL } : "Loading..."}
          style={GlobalStyles.profilePhoto}
        />
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          {user ? `${user.displayName}` : "Loading..."}
        </Text>
      </View>

      <ProfileOptions
        isFullScreenVisible={isFullScreenVisible}
        setFullScreenVisible={setFullScreenVisible}
        setSelectedContent={setSelectedContent}
        auth={auth}
      />
    </View>
  );
};

export default Profile;
