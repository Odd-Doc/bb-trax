import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import colors from "@/styles/color-palette";
interface PropTypes {
  company: String;
  address: String;
  id: String;
}

const FacilityListItem = ({ company, address, id }: PropTypes) => {
  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>{address}</Text>
      <Text style={styles.regText}>{company}</Text>
    </View>
  );
};

export default FacilityListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.carolinablue,
    borderRadius: 8,
    padding: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  regText: {
    fontSize: 16,
    fontFamily: "Roboto_500Medium",
    color: colors.offwhite,
  },
  boldText: {
    fontSize: 20,
    color: "black",
    fontFamily: "Roboto_700Bold",
  },
});
