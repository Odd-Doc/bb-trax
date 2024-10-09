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
    console.log("re-render");
    // setCurrentLocation(res.coords);
    params.id == "fromHome"
      ? mapRef.current?.animateCamera({ center: res.coords, zoom: 18 })
      : mapRef.current?.animateCamera({
          center: facilityLocation,
          zoom: 18,
        });
  };
  useEffect(() => {
    // (async () => {
    //   const pos = await getCurrentPos();
    //
    // })();
    setUserPos();
    // mapRef.current?.animateCamera({ center: currentLocation, zoom: 18 });
  }, []);
  useEffect(() => {}, []);
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
              initialRegion={{
                latitude:
                  params.id == "fromHome"
                    ? currentLocation.latitude
                    : facilityLocation.latitude,
                longitude:
                  params.id == "fromHome"
                    ? currentLocation.longitude
                    : facilityLocation.longitude,
              }}
              region={{
                latitude:
                  params.id == "fromHome"
                    ? currentLocation.latitude
                    : facilityLocation.latitude,
                longitude:
                  params.id == "fromHome"
                    ? currentLocation.longitude
                    : facilityLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              loadingEnabled={true}
              showsMyLocationButton={true}
              ref={mapRef}
            >
              <Marker coordinate={facilityLocation} />
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
