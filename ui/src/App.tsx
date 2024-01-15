import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "./contexts/ThemeContext";
import NotFound from "./pages/NotFound";
import CreateCoursePage from "./pages/CreateCoursePage";
import { useUser } from "./contexts/UserContext";
import { useEffect } from "react";
import RHF from "./pages/Rhf";

function App() {
  const { user } = useUser();
  console.log(user, "app");
  useEffect(() => {
    console.log("user changed");
  }, [user]);
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
    {
      path: "/createNewCourseOutline",
      element: <CreateCoursePage />,
    },
    { path: "/rhf", element: <RHF /> },
    {
      path: "*",
      element: <NotFound />,
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
