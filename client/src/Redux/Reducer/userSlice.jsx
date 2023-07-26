import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userRole: "",
  isLoggedIn: false,
  token: "",
  id: "",
  username: "",
  userProfilePicture: "",
  totalUsers: 0,
  payment: false,
};

//What is createSlice in Redux Toolkit?
//createSlice is a higher order function that accepts an initial state, an object full of reducer functions and a slice name.

// In Redux-Toolkit, the createSlice method helps us create a slice of the redux-store.
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    assignUserRole: (state, actions) => {
      state.userRole = actions.payload;
    },
    setLoginDetails: (state, actions) => {
      if (actions.payload) {
        const { token, id, username, profile } = actions.payload;
        state.token = token;
        state.id = id;
        state.username = username;
        state.userProfilePicture = profile;
      }
      state.isLoggedIn = !state.isLoggedIn;
    },
    resetLoginDetails: (state) => {
      state.token = "";
      state.id = "";
      state.username = "";
      state.userRole = "";
      state.userProfilePicture = "";
      state.isLoggedIn = !state.isLoggedIn;
    },
    totalUsers: (state, actions) => {
      state.totalUsers = actions.payload;
    },
    userDetails: (state, actions) => {
      if (actions.payload) {
        const { token, id, username } = actions.payload;
        state.token = token;
        state.id = id;
        state.username = username;
        // state.userProfilePicture= profile
      }
    },
    payment: (state) => {
      state.payment = true;
    },
  },
});

export const {
  assignUserRole,
  setLoginDetails,
  resetLoginDetails,
  totalUsers,
  userDetails,
  payment,
} = userSlice.actions;
export default userSlice.reducer;
