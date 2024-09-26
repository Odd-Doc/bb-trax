import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import colorPalette from "../styles/color-palette";
const DeviceList = ({ devices }) => {
  return (
    <View style={styles.devicesContainer}>
      <View style={styles.deviceListHeaderContainer}>
        <Text style={styles.deviceListHeaderText}>Hazard ID</Text>
        <Text style={styles.deviceListHeaderText}>Serial Number</Text>
        <Text style={styles.deviceListHeaderText}>Model</Text>
      </View>
      {devices.length > 0 && (
        <FlatList
          data={devices}
          contentContainerStyle={{}}
          renderItem={({ item, index }) => (
            <>
              <View style={styles.device}>
                <View style={styles.deviceTextContainer}>
                  <Text style={styles.deviceText}>{item.hazid}</Text>
                </View>
                <View style={styles.deviceTextContainer}>
                  <Text style={styles.deviceText}>{item.serialNumber}</Text>
                </View>
                <View style={styles.deviceTextContainer}>
                  <Text style={styles.deviceText}>{item._model}</Text>
                </View>
              </View>
            </>
          )}
        />
      )}
    </View>
  );
};

export default DeviceList;

const styles = StyleSheet.create({
  devicesContainer: {
    backgroundColor: colorPalette.aliceblue,
    flex: 1,
  },
  deviceTextContainer: {
    backgroundColor: "#97a770",
    marginLeft: 10,
    flex: 1,
    alignItems: "center",
  },
  deviceListHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "static",
  },
  deviceListHeaderText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
  },
  device: {
    backgroundColor: "#ba6464",
    marginTop: 20,
    flexDirection: "row",
  },
  deviceText: {},
});
