import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useSendResetPasswordEmailMutation } from "store/slices/authApiSlice";
import LoadingSpinner from "components/utils/LoadingSpinner";
import InputField from "components/formElements/InputField";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [sendResetPasswordEmail, { isLoading, isSuccess, data }] =
    useSendResetPasswordEmailMutation();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendResetPasswordEmail({ email });
  };

  useEffect(() => {
    if (isSuccess) {
      setEmail("");
      toast.success(data.message);
    }
  }, [isSuccess]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="w-full max-w-3xl p-10 text-center md:w-5/6 lg:w-4/6">
        <h1 className="mb-10 font-gilroy-semi-bold text-[32px] font-semibold leading-10 text-midnight-grey">
          Forgot Password
        </h1>
        <form
          className="flex flex-col items-center justify-center text-base"
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
          <button
            className="w-full rounded-md bg-deep-teal px-[10px] py-3 font-gilroy-semi-bold font-semibold text-white hover:saturate-[400%]"
            type="submit"
          >
            Send Reset Code
          </button>
        </form>
      </div>
      <div className="font-gilroy-medium font-medium tracking-[-0.015em] text-deep-teal">
        Oh, you remembered your password?{" "}
        <Link to="/login">
          <span className="font-gilroy-bold font-bold hover:cursor-pointer hover:underline">
            Go back.
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
