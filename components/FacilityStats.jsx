import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

import { Svg } from "react-native-svg";
import LottieLoader from "../components/LottieLoad";
import axios from "axios";
import { useSystemFacilityContext } from "../context/SytemFacilityContext";
import { useFacilityContext } from "../context/FacilityContext";
import { PieChart } from "react-native-gifted-charts";
const FacilityStats = () => {
  const { state } = useFacilityContext();
  const [dueDate, setDueDate] = useState();
  const [numberOverDue, setNumberOverdue] = useState();

  useEffect(() => {
    const currentDate = new Date(
      new Date().getTime() + new Date().getTimezoneOffset() * 60000
    ).toLocaleDateString();
    const facilityDueDate = new Date(
      new Date(state.dueDate).getTime(state.dueDate) +
        new Date(state.dueDate).getTimezoneOffset() * 60000
    ).toLocaleDateString();
    const deviceLateTestDate = new Date(
      new Date(state.devices[0].lasttest).getTime() +
        new Date(state.devices[0].lasttest).getTimezoneOffset() * 60000
    ).toLocaleDateString();
    console.log(`current date: ${currentDate}`);
    console.log(`facility due date: ${facilityDueDate}`);
    console.log(`device last tested: ${deviceLateTestDate}`);
  }, []);
  const pieData = [
    { value: 100, color: "#93FCF8", gradientCenterColor: "#3BE9DE" },
    { value: 3, color: "#FFA5BA", gradientCenterColor: "#FF7F97" },
  ];

  const renderLegendComponent = () => {
    return (
      <>
        <View style={{ flexDirection: "column", justifyContent: "center" }}>
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
            <Text style={{ color: "white" }}>Good: 40%</Text>
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
            {renderDot("#FF7F97")}
            <Text style={{ color: "white" }}>Poor: 3%</Text>
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
      <View
        style={{
          backgroundColor: "#34448B",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            margin: 20,
            padding: 16,
            borderRadius: 20,
            backgroundColor: "#232B5D",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            State of Facility
          </Text>
          <View style={{ padding: 20, alignItems: "center" }}>
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
                      47%
                    </Text>
                    <Text style={{ fontSize: 14, color: "white" }}>
                      Excellent
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

export default FacilityStats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
});
