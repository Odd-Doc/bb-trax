import React, { createContext, useContext, useReducer } from "react";

const SystemFacilityContext = createContext();

const initialState = {
  company: "",
  address: "",
  id: "",
  devices: [],
};

const SystemFacilityReducer = (state, action) => {
  switch (action.type) {
    case "ADD_SystemFacility":
      return {
        company: action.payload.company,
        address: action.payload.address,
        id: action.payload._id,
        devices: action.payload.devices,
      };

    default:
      return state;
  }
};

export const SystemFacilityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SystemFacilityReducer, initialState);

  return (
    <SystemFacilityContext.Provider value={{ state, dispatch }}>
      {children}
    </SystemFacilityContext.Provider>
  );
};

export const useSystemFacilityContext = () => useContext(SystemFacilityContext);
