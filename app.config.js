import { ExpoConfig, ConfigContext } from "@expo/config";
import * as dotenv from "dotenv";

// initialize dotenv
dotenv.config();

export default (config) => ({
  ...config,
  scheme: "bbtrax",
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.odddoc.bbtrax",
    config: {
      googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLEMAPS_APIKEY,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.odddoc.bbtrax",
  },
});
