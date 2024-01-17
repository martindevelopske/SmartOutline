import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  LoginUserContext: (user: User) => void;
  LogoutUserContext: (user: User) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  LoginUserContext: () => {},
  LogoutUserContext: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [count, setCount] = useState<number>(0);
  const { addToLocalStorage, removeFromLocalStorage } = useLocalStorage();
  useEffect(() => {
    setCount(count + 1);
    console.log("rendered", count);

    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      console.log("user from local storage found!!");

      setUser(JSON.parse(userFromLocalStorage));
    } else {
      console.log("no user form local storage");
    }
  }, []);

  // Update user in localStorage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(user));
  // }, [user]);

  const LoginUserContext = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    addToLocalStorage("user", user);
    setUser(user);
  };
  const LogoutUserContext = () => {
    removeFromLocalStorage("user");
    setUser(null);
  };
  return (
    <UserContext.Provider
      value={{ user, setUser, LoginUserContext, LogoutUserContext }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used in a userprovider");
  }
  return context;
};
