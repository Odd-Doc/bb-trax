import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import colorPalette from "@/styles/color-palette";

export const FacilityMarker = ({ coordinate }) => {
  return (
    <View>
      <Ionicons
        name="location-sharp"
        size={60}
        color={colorPalette.carolinablue}
      />
      <View
        style={{
          backgroundColor: colorPalette.aquamarine,
          width: 30,
          height: 30,
          position: "absolute",
          left: 15,
          top: 8,
          borderRadius: 50,
        }}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({});
