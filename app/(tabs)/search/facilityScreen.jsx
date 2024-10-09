import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import Facility from "../../../components/Facility";
import { useFacilityContext } from "../../../context/FacilityContext";
import FacilityStats from "../../../components/FacilityStats";
import colors from "../../../styles/color-palette";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import colorPalette from "../../../styles/color-palette";
import { useFacilityScreenStore } from "../../../store/facilityStore";
import { useFacilityMapStore } from "../../../store/map/useFacilityMapStore";

// const API_BASE = "http://localhost:3001";
const API_BASE = process.env.EXPO_PUBLIC_NGROCK_URL;

function FacilityScreen() {
  // const [companyName, setCompanyName] = useState();
  // const [companyAddress, setCompanyAddress] = useState("");
  // const [companyZip, setCompanyZip] = useState("");
  // const [companyTestDue, setCompanyTestDue] = useState("");
  // const [companyDevices, setCompanyDevices] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const { state, dispatch } = useFacilityContext();
  const facility = useFacilityScreenStore((state) => state.facility);
  const geocode = useFacilityScreenStore((state) => state.geocode);

  const setCoordinates = useFacilityMapStore((state) => state.setCoordinates);

  const params = useLocalSearchParams();
  const { id } = params;

  const router = useRouter();

  const handleShowDevices = () => {
    router.push({
      pathname: "/search/deviceListScreen",
    });
  };

  const handleShowMap = () => {
    router.push({
      pathname: "/search/map",
      params: { id: "fromFacilityScreen" },
    });
  };
  useEffect(() => {
    // console.log(useFacilityScreenStore.getState().geocode);
  }, []);
  return (
    <>
      <View style={styles.container}>
        <Facility
          company={facility.company}
          address={facility.address}
          devices={facility.devices}
          id={id}
        />
        <FacilityStats />
        {/* <View style={{ backgroundColor: "red" }}>
          <Text>{geocode.latitude}</Text>
          <Text>{geocode.longitude}</Text>
        </View> */}
        <TouchableOpacity style={styles.button} onPress={handleShowDevices}>
          <Ionicons
            name="list-outline"
            size={32}
            color={colorPalette.aquamarine}
          />
          <Text style={styles.buttonText}>Show Device List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleShowMap}>
          <Ionicons
            name="map-outline"
            size={32}
            color={colorPalette.aquamarine}
          />
          <Text style={styles.buttonText}>View on Map</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.offwhite,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#232B5D",
    fontSize: 20,
    color: "white",
    textAlign: "center",
    alignSelf: "center",
    padding: 20,
    borderRadius: 18,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "Roboto_400Regular",
    fontSize: 20,
    color: "white",
  },
});
// infoContainer: {
//   backgroundColor: "#34448B",
// },
// headerContainer: {
//   backgroundColor: "#232B5D",
//   margin: 20,
//   borderRadius: 20,
//   paddingTop: 30,
//   paddingBottom: 30,
// },
export default FacilityScreen;
