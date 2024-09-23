import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  RouteParams,
  useRouter,
  Stack,
  useLocalSearchParams,
} from "expo-router";
import axios from "axios";
import Facility from "../../../components/facility";
import { useFacilityContext } from "../../../context/FacilityContext";
// const API_BASE = "http://localhost:3001";
const API_BASE = process.env.EXPO_PUBLIC_NGROCK_URL;

function FacilityScreen() {
  const [companyName, setCompanyName] = useState();
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyZip, setCompanyZip] = useState("");
  const [companyTestDue, setCompanyTestDue] = useState("");
  const [companyDevices, setCompanyDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useFacilityContext();

  const params = useLocalSearchParams();
  const { id } = params;

  const router = useRouter();

  const handleShowDevices = async (facilityId) => {
    // setIsLoading(true);
    // const found = await fetchFacility(id).then((res) => {
    //   setIsLoading(false);
    //   router.push({
    //     pathname: "/search/deviceListScreen",
    //     params: {
    //       id: facilityId,
    //     },
    //   });
    // });
    router.push({
      pathname: "/search/deviceListScreen",
      params: {
        id: facilityId,
      },
    });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Facility" }} />
      {isLoading ? (
        <>
          <View style={styles.container}>
            <Facility
              company={state.company}
              address={companyAddress}
              devices={companyDevices}
              id={id}
            />
            <TouchableOpacity onPress={() => handleShowDevices(id)}>
              <Text
                style={{
                  backgroundColor: "#15150c",
                  fontSize: 20,
                  color: "white",
                  textAlign: "center",
                }}
              >
                DEVICES
              </Text>
            </TouchableOpacity>
          </View>
          <LottieLoader />
        </>
      ) : (
        <View style={styles.container}>
          <Facility address={state.address} devices={state.company} id={id} />
          <TouchableOpacity onPress={() => handleShowDevices(id)}>
            <Text
              style={{
                backgroundColor: "#15150c",
                fontSize: 20,
                color: "white",
                textAlign: "center",
              }}
            >
              DEVICES
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FacilityScreen;
