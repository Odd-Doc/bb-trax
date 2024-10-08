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
import colors from "../styles/color-palette";

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
    // backgroundColor: colors.aliceblue,
  },
  headerContainer: {
    // backgroundColor: colors.aliceblue,
    borderRadius: 20,
  },

  companyText: {
    fontFamily: "Roboto_900Black",
    fontSize: 30,
    textAlign: "center",
    color: "black",
  },
  addressText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 20,
    color: "black",
    textAlign: "center",
    color: "black",
  },
  viewDevicesButton: {},
  viewDevicesText: {
    color: "white",
  },
});

export default Facility;
