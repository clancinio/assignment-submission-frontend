import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../login/Login";
import { useLocalState } from "../../utils/useLocalState";

function PrivateRoute({ children }) {
  const [jwt, setJwt] = useLocalState("", "jwt");

  return jwt ? children : <Navigate to="/Login" />;
}

export default PrivateRoute;
