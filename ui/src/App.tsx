import { Route, Routes } from "react-router-dom";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "./contexts/ThemeContext";
import NotFound from "./pages/NotFound";
import CreateCoursePage from "./pages/CreateCoursePage";
import { BrowserRouter } from "react-router-dom";
import { UserProvider, useUser } from "./contexts/UserContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useEffect } from "react";

function App() {
  const { user } = useUser();
  console.log(user, "app");
  useEffect(() => {
    console.log("user changed");
  }, [user]);
  // const router: BrowserRouter = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <HomePage />,
  //   },
  //   {
  //     path: "/signin",
  //     element: <Login />,
  //   },
  //   {
  //     path: "/signup",
  //     element: <Signup />,
  //   },
  //   {
  //     element: <ProtectedRoutes />,
  //     children: [
  //       {
  //         path: "/createNewCourseOutline",
  //         element: <CreateCoursePage />,
  //       },
  //     ],
  //   },
  //   {
  //     path: "*",
  //     element: <NotFound />,
  //   },
  // ]);
  return (
    <>
      <ThemeProvider>
        <BrowserRouter basename="">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Login />} />
            <Route element={<ProtectedRoutes user={user} />}>
              <Route
                path="/createNewCourseOutline"
                element={<CreateCoursePage />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
