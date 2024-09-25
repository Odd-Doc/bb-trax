import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { router } from "expo-router";
import axios from "axios";
import { useFacilityContext } from "../context/FacilityContext";
// interface FacilityProps {
//   company: String;
//   address: String;
//   city?: String;
//   state?: String;
//   zip?: Number;
//   devices: Array<string>;
// }

function Facility({ address, company, id }) {
  const [facilityId, setFacilityId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useFacilityContext();

  useEffect(() => {
    setFacilityId(id);
  }, []);

  return (
    <>
      <View style={styles.infoContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.companyText}>{state.facility.company}</Text>
          <Text style={styles.addressText}>{state.facility.address}</Text>
          <View style={styles.statusContainer}></View>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  infoContainer: {},
  statusContainer: {
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
  },
  goodStatus: {
    backgroundColor: "#00c800",
    alignSelf: "center",
    borderRadius: 25,
  },
  badStatus: {
    backgroundColor: "#d73f3f",
    alignSelf: "center",
    borderRadius: 25,
  },
  statusText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
    textAlign: "center",
    padding: 10,
  },

  headerContainer: {
    backgroundColor: "white",
    paddingTop: 30,
  },

  companyText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 30,
    color: "black",
    textAlign: "center",
  },
  addressText: {
    fontFamily: "Roboto_300Light",
    fontSize: 0,
    color: "black",
    textAlign: "center",
  },
  devicesContainer: {
    backgroundColor: "#555555",
  },
  viewDevicesButton: {},
  viewDevicesText: {
    color: "white",
  },
});

export default Facility;
