import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import DeviceList from "../../../components/DeviceList";
import { Stack, useLocalSearchParams } from "expo-router";
import { useFacilityContext } from "../../../context/FacilityContext";
import colorPalette from "../../../styles/color-palette";
import { coolDownAsync } from "expo-web-browser";
const API_BASE = process.env.EXPO_PUBLIC_NGROCK_URL;

const DeviceListScreen = () => {
  const { state } = useFacilityContext();

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Device List" }} />
      <View style={styles.container}>
        <DeviceList devices={state.facility.devices} />
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
