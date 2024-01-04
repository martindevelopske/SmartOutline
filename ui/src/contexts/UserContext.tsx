import React, { ReactNode, createContext, useState } from "react";

export const UserContext = createContext({});

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
