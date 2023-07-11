import { configureStore } from "@reduxjs/toolkit";

import errorMiddleware from "store/middleware/errorMiddleware";
import authReducer from "store/slices/authSlice";
import apiSlice from "store/slices/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiSlice.middleware, errorMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
