import { ReactNode, createContext, useContext, useMemo, useState } from "react";

// This is the context that will be used to store the user data
const AuthContextType = {
  user: "",
  signin: (a: string, b: () => void) => {},
  signout: () => {}
};
const AuthContext = createContext(AuthContextType);

interface Props {
  children: ReactNode;
}

type value = {
  user: string;
  signin: (a: string, b: () => void) => void;
  signout: () => void;
};

// This component is used to provide the context to the children
export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState("");

  const signin = (newUser: string, callback: () => void): void => {
    setUser(newUser);
    callback();
  };

  const signout = (): void => {
    setUser("");
  };

  const value: value = useMemo(() => ({ user, signin, signout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// This hook is used to get the context
export function useAuth() {
  return useContext(AuthContext);
}
