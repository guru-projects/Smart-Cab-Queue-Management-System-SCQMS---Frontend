import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const tokenFromStorage = localStorage.getItem("token");
  const userFromStorage = JSON.parse(localStorage.getItem("user") || "null");

  const [token, setToken] = useState(tokenFromStorage);
  const [user, setUser] = useState(userFromStorage);

  function login(tokenValue, userObj) {
    setToken(tokenValue);
    setUser(userObj);
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("user", JSON.stringify(userObj));
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
