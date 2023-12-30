import { StyleSheet } from "react-native";

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
    backgroundColor: "rgba(165, 90, 214, 0.3)",
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
    borderColor: "rgba(165, 90, 214, 0.3)",
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
    margin: 40,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(165, 90, 214, 0.3)",
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
});

export default styles;
