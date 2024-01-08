import { ButtonLoading } from "@/components/Buttons";
import { signin } from "@/endpoints";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { UseUser } from "@/hooks/UseUser";
import { Toaster, toast } from "sonner";
import { UseLocalStorage } from "@/hooks/UseLocalStorage";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const { LoginUserContext } = UseUser();
  const { addToLocalStorage } = UseLocalStorage();
  const navigate = useNavigate();
  //refs
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsloading(true);
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      if (!email || !password) {
        setIsloading(false);
        !password && passwordRef.current?.focus();
        !email && emailRef.current?.focus();
        return;
      }

      //make api call
      const payload: LoginProps = {
        email: email!,
        password: password!,
      };
      await axios
        .post(signin, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.success == false) {
            setIsloading(false);
            throw new Error(res.data.message);
          }
          const user = res.data.user;
          LoginUserContext(user);

          const token: string = res.data.accessToken;
          addToLocalStorage("accesToken", token);
          setIsloading(false);
          toast("Login successfull.");
          //redirect to page
          setTimeout(() => navigate("/"), 1000);
        })
        .catch((err: Error) => {
          setIsloading(false);
          toast(err.message);
        });
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast(err.message);
      } else {
        toast("Unknown error occurred.");
      }
    }
  };
  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <Helmet>
        <title>Signup</title>
      </Helmet>
      <div className="fixed top-0 left-0 h-24 bg-white w-full "></div>
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <Toaster />
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              ref={emailRef}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <div className="flex gap-2 items-center ">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                ref={passwordRef}
                name="password"
                className="mt-1 p-2 w-full border rounded-md"
              />
              <button type="button" onClick={handleTogglePassword}>
                {showPassword ? <IoEyeOffSharp /> : <IoEye />}
              </button>
            </div>
          </div>

          <div className="w-full p-2 flex items-center justify-between">
            {isLoading ? (
              <ButtonLoading />
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Login
              </button>
            )}
            <Link to="/" className="text-blue-600 text-sm">
              Forgot password?
            </Link>
          </div>
          <div className="mt-6 p-2 w-full text-sm">
            Dont have an Account?{" "}
            <Link to="/signup" className="text-blue-600 ">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
