import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    curruntUser: null,
    isFetching: false,
    isAdmin: false,
    curruntUserId: null,
    error: null,
    curruntUserName: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.curruntUser = action.payload;
      state.isAdmin = action.payload.isAdmin;
      state.curruntUserId = action.payload._id;
      state.curruntUserName = action.payload.fullname;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload.errors;
    },
    logout: (state) => {
      state.curruntUser = null;
      state.curruntUserId = null;
      state.curruntUserName = null;
      state.isAdmin = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
