import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./utils";
import { RoutePropsType } from "./types";

const PublicRoute: React.FC<RoutePropsType> = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/home" /> : children;
};

export default PublicRoute;
