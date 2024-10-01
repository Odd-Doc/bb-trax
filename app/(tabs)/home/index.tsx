import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useEffect, useState } from "react";
// import convertTokayData from "../../../services/convertTokayData";
import { Stack, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import colorPalette from "../../../styles/color-palette";
// import rawData from "../../../services/data.json";

const HomeIndex = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
      {/* <TouchableOpacity
              onPress={handleImport}
              style={styles.importButton}
            >
              <Text style={styles.importButtonText}>Import Data</Text>
            </TouchableOpacity> */}
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          {/* <MapIndex /> */}
          {/* <View style={styles.linkContainer}>
            <TouchableOpacity
              onPress={() => router.push("/home/map")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Map</Text>
            </TouchableOpacity>
          </View> */}
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
