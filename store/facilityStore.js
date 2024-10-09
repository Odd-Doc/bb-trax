import { create } from "zustand";
import axios from "axios";
import { produce } from "immer";
import * as Location from "expo-location";

const API_BASE = process.env.EXPO_PUBLIC_NGROCK_URL;

export const useFacilityScreenStore = create((set) => ({
  facility: {
    _id: "",
    company: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    testdue: "",
    devices: [],
  },
  geocode: {
    latitude: 0,
    longitude: 0,
  },
  deviceStats: {
    overDue: "",
    current: "",
  },
  setFacility: (facility) => {
    set((state) => ({
      facility: {
        _id: facility._id,
        company: facility.company,
        address: facility.address,
        city: facility.city,
        state: facility.state,
        zip: facility.zip,
        phone: facility.phone,
        testdue: facility.testdue,
        devices: facility.devices,
      },
    }));
  },
  setDeviceStats: (stats) => {
    set(() => ({
      deviceStats: stats,
    }));
  },
  setGeocodeLocation: async (address) => {
    const response = await Location.geocodeAsync(address);
    if (response.length > 0) {
      const { latitude, longitude } = response[0];
      set(() => ({
        geocode: {
          latitude,
          longitude,
        },
      }));
    }
  },
}));
