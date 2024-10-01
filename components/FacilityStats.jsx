import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useFacilityContext } from "../context/FacilityContext";
import { PieChart } from "react-native-gifted-charts";
import useFacilityComplianceGrade from "../hooks/useFacilityComplianceGrade";
import colors from "../styles/color-palette";
import { LinearGradient } from "expo-linear-gradient";
const FacilityStats = () => {
  const [complianceGrade, setComplianceGrade] = useState();
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
      return "Overdue!";
    }
  };

  const pieData = [
    {
      value: state.deviceStats.current,
      color: colors.aquamarine,
      gradientCenterColor: "#2dbee6",
    },
    {
      value: state.deviceStats.overDue,
      color: "#f73f6a",
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
            {renderDot(colors.aquamarine)}
            <Text style={{ color: "white" }}>
              {state.deviceStats.current} Devices Tested
            </Text>
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
            {renderDot("#f73f6a")}
            <Text style={{ color: "white" }}>
              {state.deviceStats.overDue} Test Overdue
            </Text>
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
      {/* <View style={styles.statsContainer}> */}
      <LinearGradient
        style={styles.statsContainer}
        colors={[colors.aliceblue2, colors.carolinablue]}
        start={{ x: 0.2, y: 0.1 }}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>State of Facility</Text>
        </View>
        <View style={styles.chartContainer}>
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={100}
            innerRadius={80}
            innerCircleColor={colors.offwhite}
            innerCircleBorderColor={percentGrade == 100 ? null : "#f73f6a"}
            centerLabelComponent={() => {
              return (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {percentGrade}%
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "black",
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
        {/* </View> */}
      </LinearGradient>
    </>
  );
};
//testing "191028" search -> has 1/7 devices overdue

export default FacilityStats;

const styles = StyleSheet.create({
  statsContainer: {
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
  },
  header: { paddingLeft: 20, paddingVertical: 20 },
  headerText: {
    color: "black",
    fontSize: 18,
    fontFamily: "Roboto_500Medium",
  },
  chartContainer: { padding: 20, alignItems: "center" },
  legendContainer: { flexDirection: "column", justifyContent: "center" },
});
