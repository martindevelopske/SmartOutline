import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";

export const UseTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("no theme context");
  }
  return context;
};
