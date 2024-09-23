import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const DeviceList = ({ devices }) => {
  return (
    <View style={styles.devicesContainer}>
      <View style={styles.deviceListHeaderContainer}>
        <Text>Hazard ID</Text>
        <Text>Serial Number</Text>
        <Text>Model</Text>
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
  deviceTextContainer: {
    backgroundColor: "#97a770",
    marginLeft: 10,
    flex: 1,
    alignItems: "center",
  },
  devicesContainer: {
    backgroundColor: "#555555",
  },
  deviceListHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "static",
  },
  device: {
    backgroundColor: "#ba6464",
    marginTop: 20,
    flexDirection: "row",
  },
  deviceText: {},
});
