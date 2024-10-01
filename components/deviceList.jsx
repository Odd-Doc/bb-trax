import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Button,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import colorPalette from "../styles/color-palette";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, Modal, TextInput, Pressable } from "react-native";
import { useFacilityContext } from "../context/FacilityContext";
import Fuse from "fuse.js";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  ReduceMotion,
} from "react-native-reanimated";
const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

const Device = ({ hazid, sn, model, searchStyle }) => {
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
        {
          backgroundColor:
            searchStyle && searchStyle.item.hazid == hazid
              ? colorPalette.aquamarine
              : colorPalette.offwhite,
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
  const [searchBarVisible, setSearchBarVisible] = useState();
  const [searchText, setSearchText] = useState("");
  const [scrollIndex, setScrollIndex] = useState(0);
  const { state } = useFacilityContext();
  const listRef = useRef(null);
  const width = useSharedValue(50);

  const searchBarAnimConfig = {
    duration: 500,
    easing: Easing.elastic(0.8),
    reduceMotion: ReduceMotion.System,
  };
  const searchBarAnimation = useAnimatedStyle(() => ({
    width: withTiming(width.value, searchBarAnimConfig),
  }));
  // FUSE----------------------------------------------------
  const options = {
    includeScore: true,
    useExtendedSearch: true,
    keys: ["serialNumber", "hazid"],
  };
  //----------------------------------------------------------
  const fuse = new Fuse(state.facility.devices, options);
  const fuseSearchResults = fuse.search(searchText);

  useEffect(() => {
    listRef.current?.scrollToIndex({
      index: scrollIndex,
      animated: true,
    });
  }, [searchText]);

  const handleDeviceSearch = () => {
    if (width.value >= deviceWidth - width.value) {
      // setIcon("search");
      setSearchBarVisible(false);
      width.value -= deviceWidth - 80;
    } else {
      // setIcon("checkmark");
      setSearchBarVisible(true);
      width.value += deviceWidth - 80;
    }
  };

  const handleChangeText = (text) => {
    setSearchText(text);
  };
  return (
    <>
      <Animated.View
        style={[styles.animSearchBarContainer, searchBarAnimation]}
      >
        <TouchableOpacity
          onPress={handleDeviceSearch}
          activeOpacity={0.6}
          style={styles.searchButton}
        >
          <Ionicons name="search" size={32} color={"black"} />
        </TouchableOpacity>
        <View style={styles.inputConainer}>
          <TextInput
            style={[
              styles.input,
              {
                flex: 1,
                alignSelf: "center",
                display: searchBarVisible ? "flex" : "none",
              },
            ]}
            placeholder="Enter search value"
            value={searchText}
            onChangeText={(text) => handleChangeText(text)}
          />
        </View>
      </Animated.View>
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
              ref={listRef}
              keyExtractor={(item) => item.hazid}
              initialScrollIndex={scrollIndex}
              onScrollToIndexFailed={(info) => {
                const wait = new Promise((resolve) => setTimeout(resolve, 500));
                wait.then(() => {
                  listRef.current?.scrollToIndex({
                    index: info.index,
                    animated: true,
                  });
                });
              }}
              data={devices}
              contentContainerStyle={[
                {
                  gap: 11,
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 10,
                },
              ]}
              renderItem={({ item, index }) => (
                <>
                  <Device
                    hazid={item.hazid}
                    sn={item.serialNumber}
                    model={item._model}
                    searchStyle={fuseSearchResults[0]}
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
  animSearchBarContainer: {
    position: "absolute",
    right: 10,
    top: 40,
    height: 50,
    // transform: [{ translateY: 40 }, { translateX: deviceWidth - 55 }],
    zIndex: 2,
    backgroundColor: colorPalette.offwhite,
    borderRadius: 100,
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,

    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 2.5,
  },
  searchButton: {},
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  inputConainer: {
    flex: 1,
    marginLeft: 20,
  },
  input: {
    width: "100%",
    backgroundColor: colorPalette.offwhite,
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
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
    backgroundColor: colorPalette.offwhite,
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
