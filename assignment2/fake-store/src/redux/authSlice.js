// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    signIn: state => {
      state.isAuthenticated = true;
    },
    signOut: state => {
      state.isAuthenticated = false;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export const selectAuth = state => state.auth.isAuthenticated;

export default authSlice.reducer;