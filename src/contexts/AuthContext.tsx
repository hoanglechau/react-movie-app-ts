import { createContext, useContext, useMemo, useState } from "react";

// This is the context that will be used to store the user data
const AuthContextType = {
  user: "",
  signin: null,
  signout: null
};
const AuthContext = createContext(AuthContextType);

// This component is used to provide the context to the children
export function AuthProvider({ children }) {
  const [user, setUser] = useState("");

  const signin = (newUser, callback) => {
    setUser(newUser);
    callback();
  };

  const signout = () => {
    setUser(null);
  };

  const value = useMemo(() => ({ user, signin, signout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// This hook is used to get the context
export function useAuth() {
  return useContext(AuthContext);
}
