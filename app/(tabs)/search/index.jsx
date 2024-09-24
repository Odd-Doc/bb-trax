import {
  Link,
  router,
  Stack,
  useLocalSearchParams,
  usePathname,
  useRouter,
} from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Button,
  FlatList,
  Pressable,
} from "react-native";

import { useEffect, useState } from "react";
import axios from "axios";
// import index from "../../index.web";
import {
  FacilityProvider,
  useFacilityContext,
} from "../../../context/FacilityContext";
import FacilityListItem from "../../../components/FacilityListItem";
import LottieLoader from "../../../components/LottieLoad";
const API_BASE = process.env.EXPO_PUBLIC_NGROCK_URL;

// const API_BASE = "http://localhost:3001";

export default function Search() {
  const { state, dispatch } = useFacilityContext();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [facilityId, setFacilityId] = useState("");

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
        setIsLoading(false);
        dispatch({ type: "ADD_FACILITY", payload: foundData.data });
        setFacilityId(foundData.data._id);
        router.push({
          pathname: "/search/facilityScreen",
        });
      })
      .catch((err) => console.error("Error: ", err));
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Search" }} />
      <SafeAreaView>
        {isLoading ? (
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
            <LottieLoader />
          </>
        ) : (
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
                      // onPressOut={() => {

                      // }}
                      onPressOut={() => GetFacilityById(item._id)}
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
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#555555",
    height: "100%",
  },
  input: {
    marginLeft: 20,
    marginRight: 20,
    padding: 12,
    marginBottom: 12,
    marginTop: 12,
    backgroundColor: "white",
  },
  facility: {
    // backgroundColor: "#2662d2",
    // padding: 5,
    // flex: 1,
    // alignItems: "center",
    // margin: 6,
  },
  facilityText: {
    fontSize: 15,
    color: "white",
  },
  loaderContainer: {},
});
