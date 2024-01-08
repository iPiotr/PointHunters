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
    justifyContent: "flex-start",
    paddingLeft: 20,
    gap: 20,
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
  },
  nameEdit: {
    // backgroundColor: colors.background,
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    width: "100%",
  },
  editRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
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
    paddingVertical: 6,
    paddingHorizontal: 16,
    width: "60%",
    fontSize: 18,
  },
});

export default styles;
