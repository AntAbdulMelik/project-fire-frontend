import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logo, gradientBackground } from "assets/media";
import { useLoginMutation } from "store/slices/authApiSlice";
import LoadingSpinner from "components/utils/LoadingSpinner";
import InputField from "components/formElements/InputField";
import Checkbox from "components/formElements/Checkbox";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [login, { isLoading, isSuccess }] = useLoginMutation();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login({ email, password, rememberMe });
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isSuccess) navigate("/home");
  }, [isSuccess]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {windowWidth < 1024 && (
        <div className="fixed inset-0 z-[-1]">
          <img
            src={gradientBackground}
            alt="Background image"
            className="h-full w-full object-cover"
          />
        </div>
      )}
      {windowWidth < 1024 && (
        <div className="h-20">
          <img
            src={logo}
            alt="Logo image"
            className="mx-auto mb-3 h-[150px] w-[300px] pb-20"
          />
        </div>
      )}
      <div className="w-full text-center sm:w-[450px]">
        <h1 className="mb-[42px] font-gilroy-semi-bold text-[32px] font-semibold leading-10 text-midnight-grey">
          Log in
        </h1>
        <form
          className="mb-4 flex flex-col items-center justify-center"
          onSubmit={handleFormSubmit}
        >
          <InputField
            containerClassName="mb-[21px] gap-[10px]"
            inputClassName="border-misty-lavender p-3 text-dark-indigo focus:border-misty-lavender text-base"
            required
            type="email"
            label="Email"
            htmlFor="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            handleInput={(email) => setEmail(email)}
          />
          <InputField
            containerClassName="mb-[34px] gap-[10px]"
            inputClassName="border-misty-lavender p-3 text-dark-indigo focus:border-misty-lavender text-base"
            required
            type="password"
            label="Password"
            htmlFor="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            handleInput={(password) => setPassword(password)}
          />
          <button
            className="w-full rounded-md bg-deep-teal px-[10px] py-3 font-gilroy-semi-bold font-semibold text-white hover:saturate-[400%]"
            type="submit"
          >
            Log In
          </button>
        </form>
        <div className="mb-8 flex items-center justify-between gap-3">
          <Checkbox
            containerClassName="gap-[9px]"
            labelClassName="font-gilroy-medium font-medium tracking-[-0.015em] text-midnight-grey"
            inputClassName="h-[18px] w-[18px] border-deep-teal text-deep-teal"
            label="Remember password"
            htmlFor="rememberMe"
            id="rememberMe"
            name="rememberMe"
            checked={rememberMe}
            handleCheckboxChange={() => setRememberMe(!rememberMe)}
          />
          <Link
            className="font-gilroy-medium font-medium tracking-[-0.015em] text-deep-teal underline"
            to="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="font-gilroy-medium font-medium tracking-[-0.015em] text-deep-teal">
          Don't have an account?{" "}
          <Link to="/register">
            <span className="font-gilroy-bold font-bold hover:cursor-pointer hover:underline">
              Sign up.
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
