import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RouteParams, Router, Stack, useLocalSearchParams } from "expo-router";
import { MotiView, MotiTransitionProp } from "moti";

const transition: MotiTransitionProp = {
  type: "timing",
};
const Loading = ({ size }: { size: number }) => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.loadingContainer}>
        <MotiView
          from={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
          animate={{
            width: size + 20,
            height: size + 20,
            borderRadius: (size + 20) / 2,
          }}
          transition={{
            type: "timing",
            duration: 1000,
            loop: true,
          }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: size / 10,
            borderColor: "#fff",
            shadowColor: "#fff",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 10,
          }}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {},
});

export default Loading;
