import * as Location from "expo-location";

export const getCurrentPos = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    return;
  }

  let newLocation = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
    enableHighAccuracy: true,
    timeInterval: 5,
  });
  return newLocation;
};
