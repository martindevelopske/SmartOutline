import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UseUser } from "./hooks/UseUser";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./contexts/UserContext";

function App() {
  const { user } = UseUser();

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
      path: "/profile",
      element: user ? <ProfilePage /> : <Navigate to="/signin" />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <>
      <ThemeProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
