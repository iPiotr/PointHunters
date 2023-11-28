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
  },
});

export default styles;
