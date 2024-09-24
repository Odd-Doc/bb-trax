import React, { createContext, useContext, useReducer } from "react";

const FacilityContext = createContext();

const initialState = {
  company: "",
  address: "",
  id: "",
  devices: [],
  dueDate: "",
};

const facilityReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FACILITY":
      return {
        company: action.payload.company,
        address: action.payload.address,
        id: action.payload._id,
        devices: action.payload.devices,
        dueDate: action.payload.testdue,
      };

    default:
      return state;
  }
};

export const FacilityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(facilityReducer, initialState);

  return (
    <FacilityContext.Provider value={{ state, dispatch }}>
      {children}
    </FacilityContext.Provider>
  );
};

export const useFacilityContext = () => useContext(FacilityContext);
