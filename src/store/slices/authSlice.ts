import { createSlice } from "@reduxjs/toolkit";

import { Role } from "src/types";
import type { RootState } from "src/store";

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  role: Role;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export const selectIsAuthenticated = (state: RootState) => !!state.auth.user;

export const selectUserRole = (state: RootState) => state.auth.user?.role;
