// AchievementsModal.tsx
import React from "react";
import { Modal, TouchableWithoutFeedback, View } from "react-native";
import { ModalContent } from "@components";
import { Achievements } from "../types";
import styles from "../../screens/statistics/statistics.styles";

const AchievementsModal: React.FC<{
  isVisible: boolean;
  onClose: () => void;
  achievements: Achievements;
}> = ({ isVisible, onClose, achievements }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackgroundStyle}>
          <ModalContent achievements={achievements} />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AchievementsModal;
