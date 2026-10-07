import { createContext, useContext, useState } from "react";
import { api } from "../data/mockApi";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("pd_session")); } catch { return null; }
  });

  const persist = (u) => {
    setUser(u);
    u ? localStorage.setItem("pd_session", JSON.stringify(u)) : localStorage.removeItem("pd_session");
  };

  const login = async (creds) => persist(await api.login(creds));
  const register = async (data) => persist(await api.register(data));
  const logout = () => persist(null);
  const updateProfile = async (data) => persist(await api.updateProfile(user.id, data));

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
