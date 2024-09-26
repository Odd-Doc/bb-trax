import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import Facility from "../../../components/Facility";
import { useFacilityContext } from "../../../context/FacilityContext";
import FacilityStats from "../../../components/FacilityStats";
import colors from "../../../styles/color-palette";
import { LinearGradient } from "expo-linear-gradient";
// const API_BASE = "http://localhost:3001";
const API_BASE = process.env.EXPO_PUBLIC_NGROCK_URL;

function FacilityScreen() {
  const [companyName, setCompanyName] = useState();
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyZip, setCompanyZip] = useState("");
  const [companyTestDue, setCompanyTestDue] = useState("");
  const [companyDevices, setCompanyDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useFacilityContext();

  const params = useLocalSearchParams();
  const { id } = params;

  const router = useRouter();

  const handleShowDevices = () => {
    router.push({
      pathname: "/search/deviceListScreen",
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Facility
          company={state.facility.company}
          address={state.facility.address}
          devices={state.facility.devices}
          id={id}
        />
        <FacilityStats />
        <TouchableOpacity style={styles.button} onPress={handleShowDevices}>
          <Text style={styles.buttonText}>Show Device List</Text>
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
  },
  buttonText: {
    color: "white",
    fontFamily: "Roboto_400Regular",
    fontSize: 20,
    color: "black",
    textAlign: "center",
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
