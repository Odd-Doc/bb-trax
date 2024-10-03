import { ExpoConfig, ConfigContext } from "@expo/config";
import * as dotenv from "dotenv";

// initialize dotenv/
dotenv.config();

export default (config) => ({
  ...config,
  scheme: "bbtrax",
  extra: {
    eas: {
      projectId: "40a4a0dd-ebc9-4d32-bafe-161b1a1b8559",
    },
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.odddoc.bbtrax",
    config: {
      googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLEMAPS_APIKEY,
    },
  },
  android: {
    supportsTablet: true,
    bundleIdentifier: "com.odddoc.bbtrax",
    config: {
      googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLEMAPS_APIKEY_ANDROID,
    },
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.odddoc.bbtrax",
  },
});
