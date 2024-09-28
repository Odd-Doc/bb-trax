import { Redirect, Tabs } from "expo-router";
import { Stack } from "expo-router/stack";
import { Drawer } from "expo-router/drawer";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
  useFonts,
} from "@expo-google-fonts/roboto";

export default function Index() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });
  return <Redirect href="/(tabs)/search/deviceListScreen" />;
}
