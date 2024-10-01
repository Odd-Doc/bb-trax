import { Slot, Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
      <Slot />
    </>
  );
}
