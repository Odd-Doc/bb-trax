import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import DeviceList from "../../../components/deviceList";
import { Stack, useLocalSearchParams } from "expo-router";
import { useFacilityContext } from "../../../context/FacilityContext";

const API_BASE = process.env.EXPO_PUBLIC_NGROCK_URL;

const DeviceListScreen = () => {
  const params = useLocalSearchParams();
  const { id } = params;
  const abortControllerRef = useRef();
  const [companyDevices, setCompanyDevices] = useState([]);
  const { state, dispatch } = useFacilityContext();

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Device List" }} />
      <DeviceList devices={state.devices} />
    </>
  );
};

export default DeviceListScreen;

const styles = StyleSheet.create({});
