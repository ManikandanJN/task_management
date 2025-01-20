import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./utils";
import { RoutePropsType } from "./types";

const PrivateRoute: React.FC<RoutePropsType> = ({ children }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
