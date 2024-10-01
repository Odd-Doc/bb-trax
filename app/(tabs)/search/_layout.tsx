import { Stack, Tabs } from "expo-router";
import { View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FacilityProvider } from "@/context/FacilityContext";

export default function SearchLayout() {
  return (
    <FacilityProvider>
      <Stack />
    </FacilityProvider>
  );
}
