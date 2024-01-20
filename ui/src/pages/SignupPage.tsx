import { ButtonLoading } from "@/components/Buttons";
import { signup } from "@/endpoints";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { Toaster, toast } from "sonner";
import Helmet from "react-helmet";
import { useUser } from "@/contexts/UserContext";
function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  //refs
  const fnameRef = useRef<HTMLInputElement | null>(null);
  const lnameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const cPasswordRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { addToLocalStorage } = useLocalStorage();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsloading(true);
      const fname = fnameRef.current?.value;
      const lname = lnameRef.current?.value;
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      const cPassword = cPasswordRef.current?.value;
      if (!fname || !lname || !email || !password) {
        setIsloading(false);
        toast("Please Fill in all the fields");
        !cPassword && cPasswordRef.current?.focus();
        !password && passwordRef.current?.focus();
        !email && emailRef.current?.focus();
        !lname && lnameRef.current?.focus();
        !fname && fnameRef.current?.focus();
        return;
      }
      if (cPassword !== password) {
        setIsloading(false);
        toast("passwords do not match");
        !password && passwordRef.current?.focus();
        !cPassword && cPasswordRef.current?.focus();
        return;
      }
      //make api call
      const payload: SignupProps = {
        firstname: fname!,
        lastname: lname!,
        email: email!,
        password: password!,
      };
      await axios
        .post(signup, payload, {
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
          setUser(user);
          const token: string = res.data.accessToken;
          addToLocalStorage("accesToken", token);
          setIsloading(false);
          toast("Account creation successfull.");
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
        <Toaster richColors position="top-right" />
        <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-600"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              ref={fnameRef}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-600"
            >
              Last Name
            </label>
            <input
              type="text"
              ref={lnameRef}
              id="lastName"
              name="lastName"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              ref={emailRef}
              id="email"
              name="email"
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
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <div className="flex gap-2 items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                ref={cPasswordRef}
                className="mt-1 p-2 w-full border rounded-md"
              />
              <button type="button" onClick={handleTogglePassword}>
                {showPassword ? <IoEyeOffSharp /> : <IoEye />}
              </button>
            </div>
          </div>
          {isLoading ? (
            <ButtonLoading />
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Create Account
            </button>
          )}
          <div className="mt-6 p-2 w-full text-sm">
            Already have an Account?{" "}
            <Link to="/signin" className="text-blue-600 ">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
