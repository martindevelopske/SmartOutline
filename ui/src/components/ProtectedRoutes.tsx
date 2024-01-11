import {
  Navigate,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";

export default function ProtectedRoutes({
  user,
}: {
  user: User | null | boolean;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  if (user) console.log(user, "pretect");
  if (!user) {
    console.log("no user protecint");
    navigate("/signin", { state: { from: location } });
    // return <Navigate to="/signin" replace={true} state={{ from: location }} />;
  }
  return <Outlet />;
}
