import { StyleSheet } from "react-native";
import colors from "../../utils/colors";

const styles = StyleSheet.create({
  topBarSpec: {
    justifyContent: "flex-start",
    gap: 20,
  },
  title: {
    backgroundColor: colors.background,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
  },
  settingsContainer: {
    alignItems: "center",
    backgroundColor: colors.background,
  },
  settingBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "90%",
  },
  options: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: colors.background,
  },
  fullScreenModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    width: "80%",
    height: "50%",
    backgroundColor: colors.background,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  changeInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 4,
  },
});

export default styles;
