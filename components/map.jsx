import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useLocalSearchParams } from "expo-router";
import { Button, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import * as Location from "expo-location";
import { getCurrentPos } from "../server/api/getCurrentPos";
import { Stack } from "expo-router";
import { useFacilityScreenStore } from "../store/facilityStore";
export default function Map() {
  const [fromHome, setFromHome] = useState();
  const mapRef = useRef();
  const facilityLocation = useFacilityScreenStore((state) => state.geocode);
  const [currentLocation, setCurrentLocation] = useState({
    // latitude: 0,
    // longitude: 0,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
  });
  const params = useLocalSearchParams();
  const setUserPos = async () => {
    const res = await getCurrentPos();
    const modRes = res.coords;
    setCurrentLocation(res.coords);
    params.id == "fromHome"
      ? mapRef.current?.animateCamera({ center: res.coords, zoom: 18 })
      : mapRef.current?.animateCamera({
          center: facilityLocation,
          zoom: 18,
        });
  };
  useEffect(() => {
    setUserPos();
  }, []);
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
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  };
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
              customMapStyle="54be31bc4c8bb014"
              initialRegion={
                {
                  // latitude:
                  //   params.id == "fromHome"
                  //     ? currentLocation.latitude
                  //     : facilityLocation.latitude,
                  // longitude:
                  //   params.id == "fromHome"
                  //     ? currentLocation.longitude
                  //     : facilityLocation.longitude,
                }
              }
              region={
                {
                  // latitude:
                  //   params.id == "fromHome"
                  //     ? currentLocation.latitude
                  //     : facilityLocation.latitude,
                  // longitude:
                  //   params.id == "fromHome"
                  //     ? currentLocation.longitude
                  //     : facilityLocation.longitude,
                  // latitudeDelta: 0.0922,
                  // longitudeDelta: 0.0421,
                }
              }
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              loadingEnabled={true}
              showsMyLocationButton={true}
              ref={mapRef}
            >
              <Marker coordinate={currentLocation} />
              <Marker coordinate={facilityLocation} />

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleFindMe()}
              >
                <Text style={styles.buttonText}>Mark Location</Text>
              </TouchableOpacity>
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
