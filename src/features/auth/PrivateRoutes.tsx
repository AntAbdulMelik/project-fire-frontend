import { useEffect, useCallback } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useAppSelector } from "store/hooks";
import { selectIsAuthenticated } from "store/slices/authSlice";
import { useRefreshAccessTokenMutation } from "store/slices/authApiSlice";

const PrivateRoutes = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [refreshAccessToken, { isError }] = useRefreshAccessTokenMutation();

  const reauth = useCallback(async () => {
    await refreshAccessToken({});
  }, [refreshAccessToken]);

  useEffect(() => {
    if (!isAuthenticated) reauth();
  }, [isAuthenticated, reauth]);

  return isAuthenticated ? <Outlet /> : isError && <Navigate to="/login" />;
};

export default PrivateRoutes;
