import { UseTheme } from "@/hooks/UseTheme";
import { UseUser } from "@/hooks/UseUser";
import { ButtonFilled, ButtonOutline } from "./Buttons";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = UseUser();
  console.log(user);
  const { theme, toggleTheme } = UseTheme();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const handleThemeSwitch = () => {
    toggleTheme();
  };
  return (
    <>
      <div className="w-full p-3 h-20 border border-black fixed top-0 left-0 flex gap-2 items-center justify-between dark:bg-red">
        <div>Title</div>
        <div>
          <div className="flex items-center justify-between gap-3">
            <Link to="/signin">
              <ButtonOutline>Login</ButtonOutline>
            </Link>
            <Link to="/signup">
              <ButtonFilled>Sign Up</ButtonFilled>
            </Link>
            <button onClick={handleThemeSwitch}> {theme}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
