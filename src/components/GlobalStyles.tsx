import { StyleSheet } from "react-native";
import colors from "../utils/colors";

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    fontFamily: "Roboto",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 10,
    width: "100%",
  },
  topBarShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});

export default GlobalStyles;