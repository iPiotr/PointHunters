// @ts-nocheck
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
  ImageBackground,
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
import {
  sendEmailVerification,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
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
  | "help-circle"
  | "log-out"
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
  editedName,
  setEditedName,
  isEditingName,
  setIsEditingName,
  isEditingEmail,
  setIsEditingEmail,
  isEditingPassword,
  setIsEditingPassword,
  handleSave,
  editedEmail,
  setEditedEmail,
  editedPassword,
  setEditedPassword,
  userData,
}) => {
  const { user } = useAuth();

  const renderContent = (content) => {
    switch (content) {
      case "Account settings":
        return (
          <View>
            {isEditingName ? (
              <EditField
                label=""
                value={editedName}
                onChangeText={setEditedName}
                onSave={() => {
                  handleSave(editedName, "name");
                  setIsEditingName(false);
                }}
                onCancel={() => setIsEditingName(false)}
              />
            ) : (
              <SettingTitle
                title="Change Name"
                onPress={() => setIsEditingName(true)}
              />
            )}

            {isEditingEmail ? (
              <EditField
                label=""
                value={editedEmail}
                onChangeText={setEditedEmail}
                onSave={() => {
                  handleSave(editedEmail, "email");
                  setIsEditingEmail(false);
                }}
                onCancel={() => setIsEditingEmail(false)}
              />
            ) : (
              <SettingTitle
                title="Change Email"
                onPress={() => setIsEditingEmail(true)}
              />
            )}

            {isEditingPassword ? (
              <EditField
                label=""
                value={editedPassword}
                onChangeText={setEditedPassword}
                onSave={() => {
                  handleSave(editedPassword, "password");
                  setIsEditingPassword(false);
                }}
                onCancel={() => setIsEditingPassword(false)}
              />
            ) : (
              <SettingTitle
                title="Change Password"
                onPress={() => setIsEditingPassword(true)}
              />
            )}
          </View>
        );
      case "Account card":
        console.log(userData);

        return (
          <View style={{ alignItems: "center" }}>
            <Text style={styles.nameText}>
              {user ? user.displayName : "Loading..."}
            </Text>
            <Text>Personal stats</Text>

            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                marginTop: 40,
              }}
            >
              <View style={{ alignItems: "center", paddingRight: 30 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {userData ? userData.huntTimes : "Loading..."}
                </Text>
                <Text>Completed</Text>
                <Text>Hunts</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {userData ? userData.pointsCollected : "Loading..."}
                </Text>
                <Text>Hunted</Text>
                <Text>Points</Text>
              </View>
            </View>
          </View>
        );
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

  console.log(content);

  if (content == "Account card") {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
      >
        <ImageBackground
          source={
            user ? { uri: user.photoURL } : require("@assets/background.png")
          }
          style={styles.background}
        >
          <TouchableOpacity
            style={styles.fullScreenModalContainerCard}
            activeOpacity={1}
            // onPress={() => setFullScreenVisible(false)}
          >
            <Ionicons
              name="arrow-back-circle-sharp"
              size={56}
              color={colors.lightgrey}
              style={styles.iconStyle}
              onPress={onClose}
            />
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
              style={styles.modalContentCard}
            >
              {renderContent(content)}
            </TouchableOpacity>
          </TouchableOpacity>
        </ImageBackground>
      </Modal>
    );
  } else {
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
  }
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
        iconName="help-circle"
        label="Contact Support"
        onPress={() => Linking.openURL("mailto:ip.starzec@gmail..com")}
        // onPress={() => {
        //   setSelectedContent("Help Center");
        //   setFullScreenVisible(true);
        // }}
      />
      <OptionButton iconName="log-out" label="Log out" onPress={handleLogout} />
    </View>
  );
};

const Profile: React.FC = () => {
  const [isFullScreenVisible, setFullScreenVisible] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");
  const [userData, setUser] = useState<UserType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPassword, setEditedPassword] = useState("");

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    console.log("Checking user state:", user);
    if (user && user.uid) {
      console.log("Fetching user data for UID:", user.uid);
      fetchUserById(user.uid, (userData: UserType | null) => {
        if (userData) {
          console.log("User data fetched:", userData);
          setUser(userData);
        } else {
          console.log("No user data found for UID:", user.uid);
        }
      });
    }
  }, [user]); // Consider adding `user` as a dependency if it can change

  const handleSave = async (value, type) => {
    try {
      if (type === "name") {
        await updateProfile(user, {
          displayName: value,
        });
      } else if (type === "email") {
        try {
          // await updateEmail(user, value);
          await sendEmailVerification(user);
        } catch (error) {
          console.error("Error sending verification email:", error);
        }
      } else if (type === "password") {
        await updatePassword(user, value);
      }

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
        editedEmail={editedEmail}
        editedPassword={editedPassword}
        setEditedName={setEditedName}
        setEditedEmail={setEditedEmail}
        setEditedPassword={setEditedPassword}
        handleSave={handleSave}
        isEditing={isEditing}
        userData={userData}
      />

      <View style={[GlobalStyles.topBar, styles.topBarSpec]}>
        <Ionicons name="arrow-back" size={28} color={colors.black} />
        <Text style={{ fontSize: 22 }}>Profile</Text>
      </View>
      <View style={styles.title}>
        {user && user.photoURL ? (
          <Image
            source={{ uri: user.photoURL }}
            style={GlobalStyles.profilePhoto}
          />
        ) : (
          <Text>Loading...</Text> // Display a text or a placeholder image when loading
        )}
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
