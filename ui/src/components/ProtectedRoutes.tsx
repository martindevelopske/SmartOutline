import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";
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
  const { user1 } = useUser();
  useEffect(() => {
    console.log("protection activated");

    console.log(user1, "user1");
  });

  const navigate = useNavigate();
  const location = useLocation();
  if (user) console.log(user, "pretect");
  if (!user1) {
    console.log("no user protecint");
    navigate("/signin", { state: { from: location } });
    // return <Navigate to="/signin" replace={true} state={{ from: location }} />;
  }
  return <Outlet />;
}
