import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import DeviceList from "../../../components/DeviceList";
import { Stack, useLocalSearchParams } from "expo-router";
import { useFacilityContext } from "../../../context/FacilityContext";

const API_BASE = process.env.EXPO_PUBLIC_NGROCK_URL;

const DeviceListScreen = () => {
  const { state } = useFacilityContext();

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Device List" }} />
      <DeviceList devices={state.facility.devices} />
    </>
  );
};

export default DeviceListScreen;

const styles = StyleSheet.create({});
