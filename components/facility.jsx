import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

// interface FacilityProps {
//   company: String;
//   address: String;
//   city?: String;
//   state?: String;
//   zip?: Number;
//   devices: Array<string>;
// }

function Facility({ address, company, devices }) {
  const [status, setStatus] = useState();
  return (
    <>
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <View style={styles.infoContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.companyText}>{company}</Text>
              <Text style={styles.addressText}>{address}</Text>
              <View style={styles.statusContainer}>
                <View style={styles.goodStatus}>
                  {/* <Text style={styles.statusText}>Complete</Text> */}
                </View>
                <View style={styles.badStatus}>
                  <Text style={styles.statusText}>Incomplete</Text>
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
          <View style={styles.devicesContainer}>
            {devices.length > 0 && (
              <FlatList
                data={devices}
                contentContainerStyle={{ margin: 4 }}
                horizontal={false}
                style={{}}
                renderItem={({ item, index }) => (
                  <View style={styles.device}>
                    <Text>{item.serialNumber}</Text>
                    <Text>{item.serialNumber}</Text>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </SafeAreaProvider>
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
  device: {},
  deviceText: {},
});

export default Facility;
