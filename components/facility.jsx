import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { router, Stack } from "expo-router";
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
      <Stack.Screen options={{ title: "Facility" }} />
      <View style={styles.infoContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.companyText}>{company}</Text>
          <Text style={styles.addressText}>{address}</Text>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: "#34448B",
  },
  headerContainer: {
    backgroundColor: "#232B5D",
    borderRadius: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },

  companyText: {
    fontFamily: "Roboto_900Black",
    fontSize: 30,
    textAlign: "center",
    color: "white",
  },
  addressText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 20,
    color: "black",
    textAlign: "center",
    color: "white",
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
