// RewardsModal.tsx
import React from "react";
import { Modal, TouchableWithoutFeedback, View } from "react-native";
import { ModalContent } from "@components";
import { Rewards } from "../types";
import styles from "../../screens/statistics/statistics.styles";

const RewardsModal: React.FC<{
  isVisible: boolean;
  onClose: () => void;
  rewards: Rewards;
}> = ({ isVisible, onClose, rewards }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackgroundStyle}>
          <ModalContent rewards={rewards} />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default RewardsModal;
