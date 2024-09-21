import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { RouteParams, Router, Stack, useLocalSearchParams } from "expo-router";
import axios from "axios";
import Facility from "../../../components/facility";
// const API_BASE = "http://localhost:3001";
const API_BASE = process.env.EXPO_PUBLIC_NGROCK_URL;

// interface FacilityProps {
//   facilityName: String;
//   facilityStreet: String;
//   city?: String;
//   state?: String;
//   zip?: Number;
// }

function FacilityScreen() {
  const [companyName, setCompanyName] = useState();
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyZip, setCompanyZip] = useState("");
  const [companyTestDue, setCompanyTestDue] = useState("");
  const [companyDevices, setCompanyDevices] = useState([]);

  // const [companyCity, setCompanyCity] = useState();
  // const [companyState, setCompanyState] = useState();
  const companyCity = "Grand Prairie";
  const companyState = "Texas";

  const params = useLocalSearchParams();
  const { id } = params;
  const abortControllerRef = useRef();

  useEffect(() => {
    fetchFacility();
  }, []);
  const fetchFacility = async () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    try {
      const facility = await axios
        .get(API_BASE + "/facility/" + id, {
          signal: abortControllerRef.current?.signal,
        })
        .then((res) => {
          setCompanyName(res.data.company);
          setCompanyAddress(res.data.address);
          setCompanyZip(res.data.zip);
          setCompanyTestDue(
            new Date(
              new Date(res.data.testdue).getTime() +
                new Date(res.data.testdue).getTimezoneOffset() * 60000
            ).toLocaleDateString()
          );
          setCompanyDevices(res.data.devices);
        });

      // console.log(facility.data);
    } catch {
      (e) => console.error(e);
    }
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Facility" }} />

      <View style={styles.container}>
        {/* <Text>{companyName}</Text>
        <Text>{companyAddress}</Text>
        <Text>{companyCity}</Text>
        <Text>{companyState}</Text>
        <Text>{companyZip}</Text>
        <Text>{companyTestDue}</Text>
        <Text>{companyDevices.length}</Text>
        {companyDevices.map((e, i) => {
          <Text>{e.}</Text>
        })} */}

        <Facility
          company={companyName}
          address={companyAddress}
          devices={companyDevices}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FacilityScreen;
