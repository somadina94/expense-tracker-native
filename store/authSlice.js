import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  token: null,
};

const authSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      state.user = null;
    },
    refresh(state, action) {
      state.user = action.payload.user;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
