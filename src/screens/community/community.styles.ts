import { StyleSheet } from "react-native";
import colors from "../../utils/colors";

const styles = StyleSheet.create({
  postBlock: {
    flex: 1,
    backgroundColor: colors.postBlock,
    height: 400,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  postPhoto: {
    width: "100%",
    height: "65%",
  },
  desc: {
    padding: 16,
    gap: 10,
    alignItems: "center",
  },
  likes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  endElement: {
    marginLeft: "auto",
  },

  postMessage: {
    backgroundColor: colors.background,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "70%",
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 40,
  },
  postBoard: {
    backgroundColor: colors.background,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 6,
  },
  safeBottomArea: {
    height: 70,
    width: "100%",
    opacity: 0,
  },
});

export default styles;
