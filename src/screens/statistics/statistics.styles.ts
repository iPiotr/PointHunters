import { StyleSheet } from "react-native";
import colors from "../../utils/colors";

const styles = StyleSheet.create({
  topBarSpec: {
    justifyContent: "flex-start",
    paddingLeft: 20,
    gap: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  items: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  // TODO: globalStyles ?
  boldText: {
    fontWeight: "bold",
  },
  modalBackgroundStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContentStyle: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 14,
  },
});

export default styles;
