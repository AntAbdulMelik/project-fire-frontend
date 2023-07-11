import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useResetPasswordMutation } from "store/slices/authApiSlice";
import LoadingSpinner from "components/utils/LoadingSpinner";
import InputField from "components/formElements/InputField";

const ResetPassword = () => {
  const { userId, token } = useParams<{ userId: string; token: string }>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [resetPassword, { isLoading, isSuccess, data }] =
    useResetPasswordMutation();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    await resetPassword({ userId, token, password });
  };

  useEffect(() => {
    if (isSuccess) {
      setPassword("");
      setConfirmPassword("");
      toast.success(data.message);
    }
  }, [isSuccess]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-full max-w-3xl p-10 text-center md:w-5/6 lg:w-4/6">
        <h1 className="mb-10 font-gilroy-semi-bold text-[32px] font-semibold leading-10 text-midnight-grey">
          Reset Password
        </h1>
        <form
          className="flex flex-col items-center justify-center text-base"
          onSubmit={handleFormSubmit}
        >
          <InputField
            containerClassName="mb-[21px] gap-[10px]"
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
          <InputField
            containerClassName="mb-[34px] gap-[10px]"
            inputClassName="border-misty-lavender p-3 text-dark-indigo focus:border-misty-lavender text-base"
            required
            type="confirmPassword"
            label="Confirm Password"
            htmlFor="confirmPassword"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            handleInput={(confirmPassword) =>
              setConfirmPassword(confirmPassword)
            }
          />
          <button
            className="w-full rounded-md bg-deep-teal px-[10px] py-3 font-gilroy-semi-bold font-semibold text-white hover:saturate-[400%]"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
      <div className="font-gilroy-medium font-medium tracking-[-0.015em] text-deep-teal">
        Changed your mind?{" "}
        <Link to="/login">
          <span className="font-gilroy-bold font-bold hover:cursor-pointer hover:underline">
            Go back.
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
