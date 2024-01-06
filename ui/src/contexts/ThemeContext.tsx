import { ReactNode, createContext, useState } from "react";


// type Theme = "light" | "dark" | "system";
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prev) => (prev == "light" ? "dark" : "light"));

  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
