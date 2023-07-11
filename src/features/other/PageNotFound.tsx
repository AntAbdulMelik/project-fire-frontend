import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { error } from "assets/media";
import { useAppSelector } from "store/hooks";
import { selectIsAuthenticated } from "store/slices/authSlice";
import { useRefreshAccessTokenMutation } from "store/slices/authApiSlice";

const PageNotFound = () => {
  const navigate = useNavigate();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [refreshAccessToken] = useRefreshAccessTokenMutation();

  const reauth = useCallback(async () => {
    await refreshAccessToken({});
  }, [refreshAccessToken]);

  useEffect(() => {
    if (!isAuthenticated) reauth();
  }, [isAuthenticated, reauth]);

  const handleButtonClick = () => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-start gap-10 p-16">
      <div className="flex w-1/4 flex-col items-center">
        <img src={error} alt="404 error" />
      </div>
      <div className="text-center font-gilroy-semi-bold text-lg font-semibold md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
        This page cannot be found.
        <br />
        Please explore other sections of our website.
      </div>
      <button
        className="rounded-md bg-deep-teal px-4 py-2 font-inter-semi-bold text-xs font-semibold tracking-[-0.015em] text-white hover:saturate-[400%] md:px-5 md:py-2.5 md:text-sm lg:px-6 lg:py-3 lg:text-base xl:px-7 xl:py-3.5 xl:text-lg 2xl:px-8 2xl:py-4 2xl:text-xl"
        onClick={handleButtonClick}
      >
        {isAuthenticated ? "Back to Home" : "Back to Login"}
      </button>
    </div>
  );
};

export default PageNotFound;
