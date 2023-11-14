import React, { useContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { io } from "socket.io-client";
//import Loading from "../Loading/loading";

const AuthContext = React.createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthServer() {
  return useContext(AuthContext);
}
const socket = io.connect(import.meta.env.VITE_SERVER_URL);
// eslint-disable-next-line react/prop-types
export function AuthproviderServer({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const know = localStorage.getItem("user");
    if (know) {
      const localStorge = JSON.parse(localStorage.getItem("user"));
      const decode = decodeToken(localStorge);
      if (decode.id && decode.email) {
        setLoading(false);
        setCurrentUser(decode);
      } else {
        setLoading(false);
        setCurrentUser(null);
      }
    } else {
      setLoading(false);
      setCurrentUser(null);
    }
  }, []);

  async function SignIn(formData) {
    let result;
    const SighInDetails = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/user/signin`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await SighInDetails.json();
    if (data.token) {
      localStorage.setItem("user", JSON.stringify(data.token));
      setCurrentUser(data.loginObj);
      result = data.loginObj;
    } else {
      setCurrentUser(null);
      result = data.errors;
    }
    return result;
  }
  async function Login(email, password) {
    let result;
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/user/login"`,
      {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    const data = await response.json();
    if (data.loginObj && data.token) {
      localStorage.setItem("user", JSON.stringify(data.token));
      setCurrentUser(data.loginObj);
      result = data.loginObj;
    } else {
      setCurrentUser(null);
      result = data.errors;
    }
    return result;
  }
  function Logout() {
    if (currentUser) {
      localStorage.removeItem("user");
      setCurrentUser(null);
    } else {
      //
    }
  }

  const value = {
    currentUser,
    SignIn,
    Login,
    loading,
    Logout,
    socket,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
