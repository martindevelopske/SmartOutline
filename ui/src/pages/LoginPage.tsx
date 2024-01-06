
import { ButtonLoading } from "@/components/Buttons";
import { signin } from "@/endpoints";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  //refs
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !password) {
      setIsloading(false);
      !password && passwordRef.current?.focus();
      !email && emailRef.current?.focus();
    }

    //make api call
    const payload: LoginProps = {
      email: email!,
      password: password!,
    };
    const user = await axios
      .post(signin, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center">
      <div className="fixed top-0 left-0 h-24 bg-white w-full "></div>
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>

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
            <input
              type="password"

              ref={passwordRef}

              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
            />
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
