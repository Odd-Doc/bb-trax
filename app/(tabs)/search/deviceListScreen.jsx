import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import DeviceList from "../../../components/DeviceList";
import { Stack, useLocalSearchParams } from "expo-router";
import { useFacilityContext } from "../../../context/FacilityContext";
import colorPalette from "../../../styles/color-palette";
const API_BASE = process.env.EXPO_PUBLIC_NGROCK_URL;
import { useFacilityScreenStore } from "../../../store/facilityStore";

const DeviceListScreen = () => {
  const devices = useFacilityScreenStore((state) => state.facility.devices);

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Device List" }} />
      <View style={styles.container}>
        <DeviceList devices={devices} />
      </View>
    </>
  );
};

export default DeviceListScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorPalette.offwhite,
    flex: 1,
  },
});
