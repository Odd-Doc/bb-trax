import { create } from "zustand";
import axios from "axios";
import { produce } from "immer";
const API_BASE = process.env.EXPO_PUBLIC_NGROCK_URL;

export const useFacilityMapStore = create((set) => ({
  latitude: 0,
  longitude: 0,
  altitude: 0,
  setCoordinates: (coords) => {
    set(() => ({
      latitude: coords.latitude,
      longitude: coords.longitude,
      altitude: coords.altitude,
    }));
  },
}));
