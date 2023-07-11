import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { gradientBackground } from "assets/media";
import { useRegisterMutation } from "store/slices/authApiSlice";
import LoadingSpinner from "components/utils/LoadingSpinner";
import InputField from "components/formElements/InputField";
import ImageUpload from "components/formElements/ImageUpload";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState<File | undefined>();
  const [password, setPassword] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [register, { isLoading, isSuccess }] = useRegisterMutation();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("firstName", firstName);
    if (image) formData.append("image", image);
    formData.append("lastName", lastName);
    formData.append("password", password);
    await register(formData);
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
    <div className="flex h-full flex-col items-center justify-center">
      {windowWidth < 1024 && (
        <div className="fixed inset-0 z-[-1]">
          <img
            src={gradientBackground}
            alt="Background image"
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="w-[450px] text-center">
        <h1 className="mb-6 font-gilroy-semi-bold text-[32px] font-semibold leading-10 text-midnight-grey">
          Register
        </h1>
        <form
          className="mb-6 flex flex-col text-base"
          onSubmit={handleFormSubmit}
        >
          <InputField
            containerClassName="mb-[21px] gap-[10px]"
            inputClassName="border-misty-lavender p-3 text-dark-indigo focus:border-misty-lavender text-base"
            label="Email"
            htmlFor="email"
            required
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            handleInput={(email) => setEmail(email)}
          />
          <div className="flex gap-5">
            <div className="flex flex-col">
              <InputField
                containerClassName="mb-[21px] gap-[10px]"
                inputClassName="border-misty-lavender p-3 text-dark-indigo focus:border-misty-lavender text-base"
                label="First name"
                htmlFor="firstName"
                required
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                placeholder="Enter your first name"
                handleInput={(firstName) => setFirstName(firstName)}
              />
              <InputField
                containerClassName="mb-[21px] gap-[10px]"
                inputClassName="border-misty-lavender p-3 text-dark-indigo focus:border-misty-lavender text-base"
                label="Last name"
                htmlFor="lastName"
                required
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                placeholder="Enter your last name"
                handleInput={(lastName) => setLastName(lastName)}
              />
            </div>
            <ImageUpload
              containerClassName="mb-[21px] flex-1 gap-[10px]"
              inputClassName="w-full h-full bg-white border-misty-lavender"
              label="Profile Image"
              image={image}
              handleImageUpload={(file) => setImage(file)}
            />
          </div>
          <InputField
            containerClassName="mb-[21px] gap-[10px]"
            inputClassName="border-misty-lavender p-3 text-dark-indigo focus:border-misty-lavender text-base"
            label="Password"
            htmlFor="password"
            required
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            handleInput={(password) => setPassword(password)}
          />
          <div className="flex items-center justify-start gap-4">
            <button
              className="flex-1 rounded-md bg-deep-teal px-4 py-2 font-gilroy-semi-bold font-semibold text-white hover:saturate-[400%]"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        <div className="font-gilroy-medium font-medium tracking-[-0.015em] text-deep-teal">
          Changed your mind?{" "}
          <Link to="/login">
            <span className="font-gilroy-bold font-bold hover:cursor-pointer hover:underline">
              Go back.
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
