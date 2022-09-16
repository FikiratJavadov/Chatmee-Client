import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const RequireLogout = () => {
  const auth = useAuth((state) => state.in);

  return <>{!auth ? <Outlet /> : <Navigate to="/chat" />}</>;
};

export default RequireLogout;
