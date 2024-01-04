import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import { Router, RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  const getData = async () => {
    const res = await fetch("http://localhost:4000/");
    if (res.status === 401) {
      //get new access token
    }
    //retry request
    console.log(await res.json());

    return res;
  };
  useEffect(() => {
    getData();
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/signin",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);
  return (
    <>
      <div className="flex flex-col top-20 items-center justify-center p-3 min-h-screen w-screen">
        <Header />
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
