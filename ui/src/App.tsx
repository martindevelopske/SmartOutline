import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  // const getData = async () => {
  //   const res = await fetch("http://localhost:4000/");
  //   if (res.status === 401) {
  //     //get new access token
  //   }
  //   //retry request
  //   console.log(await res.json());

  //   return res;
  // };
  // useEffect(() => {
  //   getData();
  // }, []);
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
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
