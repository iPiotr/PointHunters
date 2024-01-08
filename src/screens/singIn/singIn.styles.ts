import { StyleSheet, Dimensions } from "react-native";
import colors from "../../utils/colors";

const screenWidth = Dimensions.get("window").width;
const buttonWidth = screenWidth * 0.9;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginTop: 30,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  image: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    textShadowColor: colors.text,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text,
    textShadowColor: colors.text,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    flex: 1,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  imputCont: {
    flex: 1,
    // alignContent: "center",
  },
  input: {
    width: buttonWidth,
    paddingVertical: 12,
    textAlign: "center",
    borderWidth: 0.3,
    backgroundColor: colors.background,
    borderRadius: 50,
    marginVertical: 10,
  },
  icon: {
    position: "absolute",
    top: 36,
    right: 16,
    height: "100%",
    justifyContent: "center",
  },
});

export default styles;
