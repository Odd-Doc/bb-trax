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
      <>
        <Stack.Screen
          options={{
            title: "Shmokay",
          }}
        />

        <View style={styles.container}>
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
      </>
    </>
  );
};

export default HomeIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#555555",
  },
  button: {
    backgroundColor: "#137bf2",
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
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  linkContainer: {
    marginTop: 20,
    alignSelf: "center",
  },
});
