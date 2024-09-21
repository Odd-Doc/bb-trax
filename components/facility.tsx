import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";

interface FacilityProps {
  company: String;
  address: String;
  city?: String;
  state?: String;
  zip?: Number;
  devices: Array<string>;
}

function Facility({ address, company, devices }: FacilityProps) {
  const [status, setStatus] = useState();
  return (
    <>
      <View style={styles.infoContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.companyText}>{company}</Text>
          <Text style={styles.addressText}>{address}</Text>
          <View style={styles.statusContainer}>
            <View style={styles.goodStatus}>
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 20,
                }}
              >
                Current
              </Text>
            </View>
            <View style={styles.badStatus}>
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 20,
                }}
              >
                Device(s) Missing Passing Test
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* <TouchableOpacity
        // style={[styles.viewDevicesButton, { transform: [{ translateY: -10 }] }]}
        style={styles.viewDevicesButton}
      >
        <Text style={styles.viewDevicesText}>View Devices</Text>
      </TouchableOpacity> */}
      {/* <View style={styles.devicesContainer}>
        {devices.length > 0 && (
          <FlatList
            data={devices}
            renderItem={({ item, index }) => (
              <TouchableOpacity style={styles.device}></TouchableOpacity>
            )}
          />
        )}
      </View> */}
    </>
  );
}
const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    backgroundColor: "#555555",
    // alignItems: "center",
  },
  statusContainer: {},
  goodStatus: {
    backgroundColor: "#00c800",
  },
  badStatus: {
    backgroundColor: "#d73f3f",
  },
  headerContainer: {
    backgroundColor: "white",
    paddingTop: 30,
    paddingBottom: 30,
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
    flex: 1,
    backgroundColor: "#555555",
  },
  viewDevicesButton: {
    flex: 0.25,

    backgroundColor: "#400080",
  },
  viewDevicesText: {
    color: "white",
  },
  device: {},
  deviceText: {},
});

export default Facility;
