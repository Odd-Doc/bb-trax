import { Stack, useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import colors from "../../../styles/color-palette";
import { useEffect, useState } from "react";
import axios from "axios";
// import index from "../../index.web";
import LottieLoader from "../../../components/lottieLoad";
import { useFacilityContext } from "../../../context/FacilityContext";
import FacilityListItem from "../../../components/FacilityListItem";

const API_BASE = process.env.EXPO_PUBLIC_NGROCK_URL;
// const API_BASE = "http://localhost:3001";

export default function Search() {
  const { state, dispatch } = useFacilityContext();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [readyToPush, setReadyToPush] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (searchText == "") {
      setSearchResults("");
    } else {
      GetFacilities(searchText);
    }
  }, [searchText]);

  const GetFacilities = async (input) => {
    const res = await axios
      .get(API_BASE + "/facility/search?query=" + input)
      .then((foundData) => {
        setSearchResults(foundData.data);
      })
      .catch((err) => console.error("Error: ", err));
  };
  const handleChangeText = (text) => {
    setSearchText(text);
  };
  const GetFacilityById = async (facilityId) => {
    setIsLoading(true);
    const res = await axios
      .get(API_BASE + "/facility/" + facilityId)
      .then((foundData) => {
        const deviceStats = getDeviceStatus(foundData.data.devices);
        dispatch({
          type: "ADD_FACILITY",
          payload: {
            facility: foundData.data,
            deviceStats: deviceStats,
          },
        });
        setIsLoading(false);
        router.push({
          pathname: "/search/facilityScreen",
        });
      })
      .catch((err) => console.error("Error: ", err));
  };
  const getDeviceStatus = (devices) => {
    var currentDate = new Date().getTime();
    var overDueCount = 0;
    devices.map((device, i) => {
      if (
        new Date(device.lasttest) < new Date(device.testdue) &&
        new Date(device.testdue).getTime() < currentDate
      ) {
        overDueCount += 1;
      }
    });
    return {
      overDue: overDueCount,
      current: devices.length - overDueCount,
    };
    //
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Search" }} />
      <SafeAreaView>
        {isLoading ? (
          <>
            <View style={styles.container}>
              <LottieLoader />
              <TextInput
                style={styles.input}
                placeholder="Enter search value"
                value={searchText}
                onChangeText={(text) => handleChangeText(text)}
              />
              {/* check if search text is empty, if so, do not render Flatlist */}
              {searchResults.length > 0 && (
                <FlatList
                  data={searchResults}
                  contentContainerStyle={{ gap: 10 }}
                  renderItem={({ item, index }) => (
                    <>
                      <TouchableOpacity
                        // onPressOut={() => {

                        // }}
                        onPressOut={() => GetFacilityById(item._id)}
                      >
                        <FacilityListItem
                          company={item.company}
                          address={item.address}
                          id={item._id}
                        />
                      </TouchableOpacity>
                    </>
                  )}
                />
              )}
            </View>
          </>
        ) : (
          <>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholder="Enter search value"
                value={searchText}
                onChangeText={(text) => handleChangeText(text)}
              />
              {/* check if search text is empty, if so, do not render Flatlist */}
              {searchResults.length > 0 && (
                <FlatList
                  data={searchResults}
                  contentContainerStyle={{ gap: 10 }}
                  renderItem={({ item, index }) => (
                    <>
                      <TouchableOpacity
                        onPress={() => GetFacilityById(item._id)}
                        activeOpacity={0.6}
                      >
                        <FacilityListItem
                          company={item.company}
                          address={item.address}
                        />
                      </TouchableOpacity>
                    </>
                  )}
                />
              )}
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.aliceblue2,
    //this container needs to be manually sized
    //ie. not flexed, for lottie load to cover screen (at least in this context)
    height: "100%",
  },
  input: {
    marginLeft: 20,
    marginRight: 20,
    padding: 12,
    marginBottom: 12,
    marginTop: 12,
    backgroundColor: colors.offwhite,
    borderRadius: 20,
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
  },
});
