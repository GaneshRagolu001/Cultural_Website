import React, { useContext, useEffect, useState, createContext } from "react";
import axiosClient from "../api/axiosClient.js";

const authContext = createContext();

const initializeUser = () => {
  const localuserString = localStorage.getItem("user");
  if (localuserString) {
    try {
      return JSON.parse(localuserString);
    } catch (e) {
      console.error("Error parsing user from localStorage:", e);
      localStorage.removeItem("user");
    }
  }
  return null;
};

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(initializeUser);

  useEffect(() => {
    axiosClient
      .get("/auth/profile")
      .then((res) => {
        setuser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log("Profile fetch failed. Logging out user:", err);
      });
  }, []);

  const login = async (email, password) => {
    const res = await axiosClient.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setuser(res.data.user);
  };

  const logout = async () => {
    console.log("iam runnded Logout");
    await axiosClient.post("/auth/logout");
    setuser(null);
    localStorage.removeItem("user");
  };

  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  );
};

export const AuthUser = () => useContext(authContext);
