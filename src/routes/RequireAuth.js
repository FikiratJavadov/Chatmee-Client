import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const RequireAuth = () => {
  const auth = useAuth((state) => state.in);

  return <>{auth ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default RequireAuth;
