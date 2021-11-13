import React from "react";

export const authContext = React.createContext();

export const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  tokenExpires: 0,
  role: 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        tokenExpires: action.payload.expires,
        role: action.payload.role,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        tokenExpires: 0,
        role: 0,
      };
    default:
      return state;
  }
};
