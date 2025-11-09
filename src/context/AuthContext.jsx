import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  // ✅ Hydrate user from localStorage on reload
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    const savedEmail = localStorage.getItem("email");
    const savedName = localStorage.getItem("name");

    if (savedToken && savedEmail) {
      setToken(savedToken);
      setUser({
        role: savedRole?.toLowerCase(),
        email: savedEmail,
        name: savedName,
      });
    }
  }, []);

function login(token, userData) {
  // Save to localStorage first
  localStorage.setItem("token", token);
  localStorage.setItem("role", userData.role.toLowerCase());
  localStorage.setItem("name", userData.name);
  localStorage.setItem("email", userData.email);

  // Immediately update state
  setUser({
    role: userData.role.toLowerCase(),
    email: userData.email,
    name: userData.name,
  });
  setToken(token);
}


  function logout() {
    setToken("");
    setUser(null);
    localStorage.clear();
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
