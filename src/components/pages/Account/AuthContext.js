import React, { useContext, useState, useEffect } from "react";
import { auth } from "./firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setcurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
