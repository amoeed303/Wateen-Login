import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ActionPage from "./ActionPage";
import Cookies from "js-cookie";

const ProtectedRoute = () => {
  const isLoggedIn = Cookies.get("IsLoggedIn") === "true";
 
  return (
    <>{isLoggedIn ? <ActionPage /> : <Navigate to="/" />}</>
  );
};

export default ProtectedRoute;
