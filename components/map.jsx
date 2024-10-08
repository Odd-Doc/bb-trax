import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Button, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import * as Location from "expo-location";
import { getCurrentPos } from "../server/api/getCurrentPos";
import { Stack } from "expo-router";

export default function Map() {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const geocodeLocation = () => {
    console.log("here");
  };
  useEffect(() => {
    (async () => {
      const pos = await getCurrentPos();
      setCurrentLocation(pos);
    })();
  }, [currentLocation]);
  return (
    <>
      {/* <Stack.Screen
        options={{
          headerRight: () => (
            <Button onPress={() => geocodeLocation()} title="Geocode Test" />
          ),
        }}
      /> */}
      <View style={[styles.container, StyleSheet.absoluteFillObject]}>
        {currentLocation && (
          <>
            <MapView
              initialRegion={currentLocation.coords}
              // region={location}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              loadingEnabled={true}
              showsMyLocationButton={true}
            >
              <Marker coordinate={currentLocation} />
            </MapView>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    // borderRadius: 12,
  },
});
