import LogoBanner from "features/auth/LogoBanner";
import LoginForm from "features/auth/LoginForm";

const Login = () => {
  return (
    <>
      <div className="flex h-screen">
        <div className="hidden lg:block lg:w-1/2">
          <LogoBanner />
        </div>
        <div className="mx-4 flex max-w-full flex-1 flex-col items-center justify-center p-4">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Login;
