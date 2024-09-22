import { StyleSheet, Text, View } from "react-native";
import React from "react";
import waterloader from "../assets/waterloader.json";
import LottieView from "lottie-react-native";
const LottieLoader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView
        source={waterloader}
        style={{ height: 100, width: 100 }}
        autoPlay
        loop
      />
    </View>
  );
};

export default LottieLoader;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "#00000099",
  },
});
