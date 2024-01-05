import { ReactNode, createContext, useState } from "react";

const temp = {
  firstname: "martin",
  lastname: "ndung'u",
  email: "marti",
  password: "hlj",
} as User;
interface UserContextProps {
  user: User | null;
  signup: (userData: SignupProps) => void;
  login: (userData: LoginProps) => void;
  logout: () => void;
}
export const UserContext = createContext<UserContextProps>({
  user: temp || null,
  signup: () => {},
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const signup = (userData: SignupProps) => {
    setUser(userData as User);
  };
  const login = (userData: LoginProps) => {
    // logic
    setUser(userData as User);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
