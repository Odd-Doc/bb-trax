import { StyleSheet, Text, View } from "react-native";
import React from "react";
import waterloader from "../assets/waterloader.json";
import LottieView from "lottie-react-native";
const LottieLoader = () => {
  return (
    <View>
      <LottieView
        source={waterloader}
        // style={{ width: "100%", height: "100%" }}
        style={{ height: 100 }}
        autoPlay
        loop
      />
    </View>
  );
};

export default LottieLoader;

const styles = StyleSheet.create({});
