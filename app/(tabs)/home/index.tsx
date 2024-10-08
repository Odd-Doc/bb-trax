import {
  Button,
  GestureResponderEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useEffect, useState } from "react";
import convertTokayData from "../../../convertTokayData";
import { Stack, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import colorPalette from "../../../styles/color-palette";
// import rawData from "../../../data.json";

import { useCounterStore } from "../../../store/counterStore";
import { useFacilityScreenStore } from "../../../store/facilityStore";

interface Props {
  onPress?: Function;
}
const HomeIndex = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const count = useCounterStore((state) => state.count);
  // const facility = useFacilityScreenStore((state) => state.facility);

  // const handleImport = async () => {
  //   setIsLoading(true);
  //   await convertTokayData(rawData)
  //     .catch((err) => console.error(err))
  //     .then(() => setIsLoading(false));
  // };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Home",
        }}
      />
      {/* <LinearGradient
        style={styles.container}
        colors={[colors.cerulean, colors.indigodye]}
        start={{ x: 0.5, y: 0.25 }}
      > */}
      {/*
            ////////////////////////////////////////////////////////////////////////////
             button used to format source data into more usable state for mongo models 
            ////////////////////////////////////////////////////////////////////////////
             */}
      {/* <TouchableOpacity onPress={handleImport} style={styles.importButton}>
        <Text style={styles.importButtonText}>Import Data</Text>
      </TouchableOpacity> */}
      <View>
        {/* <Text>{count}</Text> */}
        {/* {facility.devices && <Text>{facility.devices[0].hazardcat}</Text>} */}
      </View>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          {/* <MapIndex /> */}
          <View style={styles.linkContainer}>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/home/map",
                  params: { id: "fromHome" },
                })
              }
              style={styles.button}
            >
              <Text style={styles.buttonText}>Map</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colorPalette.aliceblue,
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto_500Medium",
                fontSize: 20,
              }}
            >
              Home Screen
            </Text>
          </View>
        </ScrollView>
      </View>

      {/* </LinearGradient> */}
    </>
  );
};

export default HomeIndex;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorPalette.aliceblue,
    flex: 1,
  },
  button: {
    backgroundColor: colorPalette.carolinablue,
    borderRadius: 12,
    paddingLeft: 10,
    paddingTop: 30,
    paddingBottom: 30,
    paddingRight: 10,
    width: 200,
  },
  importButton: {
    backgroundColor: "#ff9306",
    borderRadius: 12,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 10,
    width: 100,
  },
  importButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 12,
    fontWeight: "700",
  },
  buttonText: {
    textAlign: "center",
    color: "black",
    fontSize: 20,
    fontWeight: "700",
  },
  linkContainer: {
    marginTop: 20,
    alignSelf: "center",
  },
});
