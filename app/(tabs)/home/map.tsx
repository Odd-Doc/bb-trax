import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Map from "../../../components/map";
import * as Location from "expo-location";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const MapIndex = () => {
  const [location, setLocation] = useState<any>({});
  const [errorMsg, setErrorMsg] = useState("");

  const handleFindMe = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
    // console.log(location);
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Map" }} />
      <SafeAreaView>
        <View style={styles.mapContainer}>
          <Map loc={location} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleFindMe()}
          >
            <Text style={styles.buttonText}>Mark Location</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default MapIndex;

const styles = StyleSheet.create({
  mapContainer: {
    height: 500,
    padding: 10,
  },
  button: {
    backgroundColor: "green",
    width: 150,
    height: 150,
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
});
