import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

import { Svg } from "react-native-svg";
import LottieLoader from "../components/LottieLoad";
import axios from "axios";
import { useSystemFacilityContext } from "../context/SytemFacilityContext";
import { useFacilityContext } from "../context/FacilityContext";
import { PieChart } from "react-native-gifted-charts";
import useFacilityComplianceGrade from "../hooks/useFacilityComplianceGrade";
const FacilityStats = () => {
  const { state } = useFacilityContext();
  const percentGrade = useFacilityComplianceGrade({
    data: {
      overdue: state.deviceStats.overDue,
      current: state.deviceStats.current,
    },
  });

  const getComplianceGrade = () => {
    if (percentGrade == 100) {
      return "All Caught Up!";
    } else {
      return "Something is Missing!";
    }
  };

  const pieData = [
    {
      value: state.deviceStats.current,
      color: "#93FCF8",
      gradientCenterColor: "#3BE9DE",
    },
    {
      value: state.deviceStats.overDue,
      color: "#fb3459",
      gradientCenterColor: "#FF7F97",
    },
  ];

  const renderLegendComponent = () => {
    return (
      <>
        <View style={styles.legendContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              marginRight: 20,
              justifyContent: "center",
            }}
          >
            {renderDot("#3BE9DE")}
            <Text style={{ color: "white" }}>{state.deviceStats.current}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              marginRight: 20,
              justifyContent: "center",
            }}
          >
            {renderDot("#fb3459")}
            <Text style={{ color: "white" }}>{state.deviceStats.overDue}</Text>
          </View>
        </View>
      </>
    );
  };

  const renderDot = (color) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.statsContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>State of Facility</Text>
          </View>
          <View style={styles.chartContainer}>
            <PieChart
              data={pieData}
              donut
              showGradient
              sectionAutoFocus
              radius={90}
              innerRadius={60}
              innerCircleColor={"#232B5D"}
              centerLabelComponent={() => {
                return (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {percentGrade}%
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      {getComplianceGrade()}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          {renderLegendComponent()}
        </View>
      </View>
    </>
  );
};
//testing "191028" search -> has 1/7 devices overdue

export default FacilityStats;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#34448B",
    flex: 1,
    justifyContent: "center",
  },
  statsContainer: {
    backgroundColor: "#232B5D",
    borderRadius: 20,
  },
  header: { paddingLeft: 20, paddingVertical: 20 },
  headerText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Roboto_500Medium",
  },
  chartContainer: { padding: 20, alignItems: "center" },
  legendContainer: { flexDirection: "column", justifyContent: "center" },
});
