import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface PropTypes {
  company: String;
  address: String;
}

const FacilityListItem = ({ company, address }: PropTypes) => {
  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>{company}</Text>
      <Text style={styles.regText}>{address}</Text>
    </View>
  );
};

export default FacilityListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e1e1e1",
    borderRadius: 8,
    padding: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  regText: {
    fontSize: 15,
    fontFamily: "Roboto_400Regular",
  },
  boldText: {
    fontSize: 20,
    fontFamily: "Roboto_700Bold",
  },
});
