import React, { createContext, useContext, useReducer } from "react";

const FacilityContext = createContext();

const initialState = {
  facility: {
    company: "",
    address: "",
    id: "",
    devices: [],
    dueDate: "",
  },
  deviceStats: {
    overDue: "",
    current: "",
  },
};

const facilityReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FACILITY":
      return {
        facility: action.payload.facility,
        deviceStats: {
          overDue: action.payload.deviceStats.overDue,
          current: action.payload.deviceStats.current,
        },
      };
    case "ADD_STATS":
      return {
        ...state,
        currentDevices: action.payload.current,
        overDueDevices: action.payload.overDue,
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
