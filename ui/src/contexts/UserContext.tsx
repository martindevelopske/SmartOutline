import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

const temp = {
  firstname: "martin",
  lastname: "ndung'u",
  email: "marti",
  password: "hlj",
} as User;
interface UserContextProps {
  user: User | null;

  setUser: Dispatch<SetStateAction<User | null>>;

  signup: (userData: SignupProps) => void;
  login: (userData: LoginProps) => void;
  logout: () => void;
}
export const UserContext = createContext<UserContextProps>({
  user: temp || null,

  setUser: () => {},
  signup: () => {},
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signup = (userData: SignupProps) => {
    setUser(userData as User);

    //store token in localstorage
  };
  const login = (userData: LoginProps) => {
    // logic
    setUser(userData as User);
  };

  const logout = () => {
    setUser(null);

    //remove items from localstorage
  };

  return (
    <UserContext.Provider value={{ user, setUser, signup, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
