import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import React, { useEffect, useState } from "react";
import Map from "../../../components/Map";
import * as Location from "expo-location";
import { Stack, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const MapIndex = () => {
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
      // setLocation({
      //   latitude: location.coords.latitude,
      //   longitude: location.coords.longitude,
      //   latitudeDelta: 0.0922,
      //   longitudeDelta: 0.0421,
      // });
    })();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Map",
        }}
      />

      <View style={styles.mapContainer}>
        <Map />
      </View>
    </>
  );
};

export default MapIndex;

const styles = StyleSheet.create({
  mapContainer: {
    height: "100%",
  },
});
