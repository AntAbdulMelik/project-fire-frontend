import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

import type { RootState } from "src/store";
import { setCredentials, clearCredentials } from "store/slices/authSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;
    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          "/auth/refresh",
          api,
          extraOptions
        );
        if (refreshResult.data) {
          api.dispatch(setCredentials(refreshResult.data));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(clearCredentials());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Employee", "Project", "Invoice"],
  endpoints: () => ({}),
});

export default apiSlice;
