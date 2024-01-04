import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used in a userprovider");
  }
  return context;
};
