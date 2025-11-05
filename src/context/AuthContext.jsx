import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("scqms_token"));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("scqms_user"));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (token) localStorage.setItem("scqms_token", token);
    else localStorage.removeItem("scqms_token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("scqms_user", JSON.stringify(user));
    else localStorage.removeItem("scqms_user");
  }, [user]);

  function login(tokenValue, userObj) {
    setToken(tokenValue);
    setUser(userObj);
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("scqms_token");
    localStorage.removeItem("scqms_user");
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
