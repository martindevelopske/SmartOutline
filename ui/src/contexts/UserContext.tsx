import { UseLocalStorage } from "@/hooks/UseLocalStorage";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface UserContextProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  LoginUserContext: (user: User) => void;
  LogoutUserContext: (user: User) => void;
}

const { addToLocalStorage, getFromLocalStorage, removeFromLocalStorage } =
  UseLocalStorage();
export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  LoginUserContext: () => {},
  LogoutUserContext: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check localStorage on mount and update user state
    const userFromLocalStorage: string | null = getFromLocalStorage("user");
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
    }
  }, []);

  const LoginUserContext = (user: User) => {
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
