import { Slot, Stack } from "expo-router";
import { FacilityProvider } from "../context/FacilityContext";

export default function RootLayout() {
  return (
    <>
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
      <Slot />
    </>
  );
}
