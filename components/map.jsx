import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useLocalSearchParams } from "expo-router";
import mapStyles from "../styles/mapStyles";
import ToggleSwitch from "./ToggleSwitch";
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  useColorScheme,
} from "react-native";
import * as Location from "expo-location";
import { getCurrentPos } from "../server/api/getCurrentPos";
import { Stack } from "expo-router";
import { useFacilityScreenStore } from "../store/facilityStore";
import { FacilityMarker } from "../components/CustomMarkers";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "@/store/map/useThemeStore";
export default function Map() {
  const [mapDarkMode, setMapDarkMode] = useState(false);
  const isDarkTheme = useThemeStore((state) => state.isDarkTheme);

  const [fromHome, setFromHome] = useState();
  const mapRef = useRef();
  const facilityLocation = useFacilityScreenStore((state) => state.geocode);
  const [mapStyle, setMapStyle] = useState("");
  const [currentLocation, setCurrentLocation] = useState({
    // latitude: 0,
    // longitude: 0,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
  });
  const params = useLocalSearchParams();

  useEffect(() => {
    isDarkTheme == true ? setMapStyle("dark") : setMapStyle("");
  }, [isDarkTheme]);
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
      <Stack.Screen
        options={
          {
            // headerRight: () => (
            //   // <Button onPress={() => geocodeLocation()} title="Geocode Test" />
            //   <View>
            //     <ToggleSwitch />
            //   </View>
            // ),
          }
        }
      />

      <View style={[styles.container, StyleSheet.absoluteFillObject]}>
        {currentLocation && (
          <>
            <MapView
              customMapStyle={mapStyles[mapStyle]}
              region={{}}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              loadingEnabled={true}
              showsMyLocationButton={true}
              ref={mapRef}
            >
              <Marker coordinate={currentLocation} />
              <Marker coordinate={facilityLocation}>
                <FacilityMarker />
              </Marker>
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
  switchButton: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  activeSwitch: {
    backgroundColor: "#ccc",
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
