import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../../styles/color-palette";
import React, { useEffect, useState } from "react";
// import convertTokayData from "../../../services/convertTokayData";
import { Stack, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
// import rawData from "../../../services/data.json";
// import LoadingScreen from "../../../(stack)/loadingScreen";
const HomeIndex = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // useEffect(() => {
  //   console.log(isLoading);
  // }, [isLoading]);
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
          title: "Shmokay",
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
        <ScrollView>
          {/* <MapIndex /> */}
          <View style={styles.linkContainer}>
            <TouchableOpacity
              onPress={() => router.push("/home/map")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Map</Text>
            </TouchableOpacity>
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
    backgroundColor: colors.aliceblue,
    flex: 1,
  },
  button: {
    backgroundColor: colors.carolinablue,
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
