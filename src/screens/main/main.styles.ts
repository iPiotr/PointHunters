import { StyleSheet } from "react-native";
import colors from "../../utils/colors";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  gameTopBar: {
    marginTop: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
    backgroundColor: colors.lightPrimary,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    fontSize: 20,
  },
  map: {
    flex: 1,
    width: "100%",
  },
  radius: {
    height: 40,
    width: 40,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "rgba(156, 69, 214, 0.1)",
    borderWidth: 1,
    borderColor: colors.lightPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: "#9c45d6",
  },
  modalView: {
    position: "relative",
    margin: 40,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.lightPrimary,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24,
  },
  mapImage: {
    width: 200,
    height: 100,
    marginBottom: 15,
  },
  textInput: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginTop: 8,
  },
  input: {
    width: "90%",
    paddingVertical: 12,
    textAlign: "center",
    borderWidth: 0.3,
    backgroundColor: colors.background,
    borderRadius: 50,
    marginVertical: 10,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  createButton: {
    backgroundColor: colors.lightPrimary,
    fontSize: 18,
    fontWeight: "bold",
    padding: 8,
    borderRadius: 10,
  },
});

export default styles;
