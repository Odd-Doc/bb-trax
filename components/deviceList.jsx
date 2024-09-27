import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import colorPalette from "../styles/color-palette";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, Modal, TextInput, Pressable } from "react-native";
import { useFacilityContext } from "../context/FacilityContext";
import Fuse from "fuse.js";

const deviceWidth = Dimensions.get("screen").width;

const Device = ({ hazid, sn, model }) => {
  return (
    <View
      style={[
        styles.row,
        {
          shadowOffset: {
            width: -2,
            height: 3,
          },
          shadowOpacity: 0.6,
          shadowRadius: 2.5,
        },
      ]}
    >
      <View style={styles.col}>
        <Text style={styles.tableCell}>{hazid}</Text>
      </View>
      <View style={styles.col}>
        <Text style={styles.tableCell}>{sn}</Text>
      </View>
      <View style={styles.col}>
        <Text style={styles.tableCell}>{model}</Text>
      </View>
    </View>
  );
};

const DeviceList = ({ devices }) => {
  const [modalVisible, setModalVisible] = useState();
  const [searchText, setSearchText] = useState("");
  const { state } = useFacilityContext();
  //FUSE----------------------------------------------------
  // const options = {
  //   includeScore: true,
  //   useExtendedSearch: true,
  //   keys: ["serialNumber"],
  // };

  // const fuse = new Fuse(state.facility.devices, options);
  // fuse.search("'Man 'Old | Artist$");
  useEffect(() => {}, [searchText]);
  const handleDeviceSearch = () => {
    setModalVisible(true);
  };

  const handleChangeText = (text) => {
    setSearchText(text);
  };
  return (
    <>
      <TouchableOpacity
        onPress={handleDeviceSearch}
        activeOpacity={0.6}
        style={{
          backgroundColor: colorPalette.aliceblue,
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 100,
          position: "absolute",
          transform: [{ translateY: 40 }, { translateX: deviceWidth - 55 }],
          shadowOffset: {
            width: -2,
            height: 2,
          },
          shadowOpacity: 0.6,
          shadowRadius: 2.5,
          zIndex: 2,
        }}
      >
        <Ionicons name="search" size={32} color={"black"} />
      </TouchableOpacity>
      <View style={styles.devicesContainer}>
        <View
          style={[
            styles.deviceListHeaderContainer,
            {
              shadowOffset: {
                width: -2,
                height: 2,
              },
              shadowOpacity: 0.6,
              shadowRadius: 2.5,
            },
          ]}
        >
          <View style={styles.col}>
            <Text style={styles.deviceListHeaderText}>Hazard ID</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.deviceListHeaderText}>Serial Number</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.deviceListHeaderText}>Model</Text>
          </View>
        </View>

        <View style={styles.deviceListContainer}>
          {devices.length > 0 && (
            <FlatList
              data={devices}
              contentContainerStyle={{
                gap: 11,
                marginLeft: 10,
                marginRight: 10,
                marginTop: 10,
              }}
              renderItem={({ item, index }) => (
                <>
                  <Device
                    hazid={item.hazid}
                    sn={item.serialNumber}
                    model={item._model}
                  />
                </>
              )}
            />
          )}
        </View>
      </View>

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              activeOpacity={0.6}
              style={{ padding: 10 }}
            >
              <Ionicons name="close" size={32} color={"black"} />
            </TouchableOpacity>
            <View style={styles.inputConainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter search value"
                value={searchText}
                onChangeText={(text) => handleChangeText(text)}
              />
            </View>
          </View>
        </View>
      </Modal> */}
    </>
  );
};

export default DeviceList;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  inputConainer: {
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  input: {
    backgroundColor: colorPalette.carolinablue,
    borderRadius: 20,
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
    padding: 10,
  },
  modalView: {
    flexDirection: "column",
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    paddingBottom: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    backgroundColor: "#8cbfcd",
    flexDirection: "row",
    padding: 10,
    borderRadius: 5,
  },
  col: {
    width: "33.3%",
    alignItems: "center",
  },
  tableCell: {
    fontSize: 18,
    padding: 2,
  },
  devicesContainer: {
    backgroundColor: colorPalette.aliceblue,
    flex: 1,
  },
  deviceListContainer: {
    flex: 1,
  },
  deviceTextContainer: {
    backgroundColor: "#97a770",
    marginLeft: 10,
    flex: 1,
    alignItems: "center",
  },
  deviceListHeaderContainer: {
    flexDirection: "row",
    position: "static",
    paddingVertical: 20,
    paddingLeft: 10,
    paddingRight: 12,
    backgroundColor: colorPalette.aliceblue2,

    // borderBottomLeftRadius: 5,
    // borderBottomRightRadius: 5,
    zIndex: 1,
  },
  deviceListHeaderText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
  },
  device: {
    backgroundColor: "#ba6464",
    marginTop: 20,
    flexDirection: "row",
  },
  deviceText: {},
});
