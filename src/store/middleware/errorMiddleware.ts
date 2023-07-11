import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const errorMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const endpointName = action.meta.arg.endpointName;
      const message =
        action.payload.data.error ||
        action.payload.data.map((obj: any) => obj.message).join(" ");
      if (endpointName !== "refreshAccessToken") toast.error(message);
    }

    return next(action);
  };

export default errorMiddleware;
