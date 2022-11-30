import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();
export const StateProvider = ({ initialState, reducer, children }) => {
  <StateContext.provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.provider>;
};
export default StateProvider;
