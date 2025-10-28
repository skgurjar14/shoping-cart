import React, { createContext, useContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalstorage";


export const AuthContext = createContext(); // ✅ add export

export function AuthProvider({ children }) {
  // persistent users list (registered accounts) - for demo only
  const [users, setUsers] = useLocalStorage("sc_users", []);
  // authUser: null or { id, name, email }
  const [authUser, setAuthUser] = useLocalStorage("sc_auth", null);

  // Register: throws error if email exists
  const register = ({ name, email, password }) => {
    if (!name || !email || !password) throw new Error("All fields required");
    const exists = users.find(u => u.email === email);
    if (exists) throw new Error("User already exists");
    const newUser = { id: Date.now(), name, email, password };
    setUsers(prev => [...prev, newUser]);
    // auto-login after register
    const session = { id: newUser.id, name: newUser.name, email: newUser.email };
    setAuthUser(session);
    return session;
  };

  // Login: validates credentials; remember decides persistence
  const login = ({ email, password, remember = false }) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid credentials");
    const session = { id: user.id, name: user.name, email: user.email };

    if (remember) {
      // store in localStorage via hook
      setAuthUser(session);
    } else {
      // if not remember: set React state only and remove persistent key
      // We keep transient in-memory by temporarily using setAuthUser then remove storage
      // Implementation: write to state without saving to localStorage:
      // Since useLocalStorage persists always, we simulate by setting and removing key
      setAuthUser(session);
      // remove persistent storage so it won't survive reload
      try { localStorage.removeItem("sc_auth"); } catch (e) {}
    }
    return session;
  };

  const logout = () => {
    setAuthUser(null);
    try { localStorage.removeItem("sc_auth"); } catch(e){}
  };

  return (
    <AuthContext.Provider value={{ users, authUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
