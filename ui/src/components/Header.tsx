import { useTheme } from "@/hooks/useTheme";
import { ButtonFilled, ButtonOutline } from "./Buttons";
import { IoMoon } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import { useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/contexts/UserContext";

const Header = () => {
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();

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
      <div className="w-full p-3 h-20 border-b border-slate-300 fixed top-0 left-0 flex gap-2 items-center justify-between dark:bg-red">
        <div className="flex items-center justify-center gap-3">
          <div className="text-3xl">TopicTree</div>
          <div className=" ml-5 md:ml-20 flex gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger className=" text-xl flex gap-1 items-center justify-center">
                Products <IoIosArrowDown size="20" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Outline Creator</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Outline Generator</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div>
          {!user && (
            <div className="flex items-center justify-between gap-3">
              <Link to="/signin">
                <ButtonOutline>Login</ButtonOutline>
              </Link>
              <Link to="/signup">
                <ButtonFilled>Sign Up</ButtonFilled>
              </Link>
              <button onClick={handleThemeSwitch}>
                {theme === "light" ? <IoMoon /> : <FiSun />}
              </button>
            </div>
          )}
          {user && (
            <div className="flex gap-2 items-center justify-center">
              <div className="flex items-center justify-center gap-2 border rounded-md p-2 bg-slate-400">
                {user?.firstname} {user?.lastname}
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="border-l px-2">
                      <IoIosArrowDown size="20" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link to="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>settings</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <button onClick={handleThemeSwitch}>
                {theme === "light" ? <IoMoon size="20" /> : <FiSun size="20" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
