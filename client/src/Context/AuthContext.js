import axios from "axios";
import { createContext, useEffect, useState } from "react";

import { API_BASEURL_USERS } from "../constants";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const tokenLocal = JSON.parse(window.localStorage.getItem("token"));
  const [token, setToken] = useState(tokenLocal);
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get(`${API_BASEURL_USERS}/getMe`, config);
      setUser(res.data);
    })();
  }, [token]);
  const login = (tk, uData) => {
    console.log(tk, uData);
    window.localStorage.setItem("token", JSON.stringify(tk));
    setToken(tk);
    setUser(uData);
  };
  const logout = () => {
    window.localStorage.removeItem("token");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
