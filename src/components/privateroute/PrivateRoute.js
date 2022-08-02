import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import httpRequest from "../../services/httpRequestService";
import { useUser } from "../user-context/UserContext";

function PrivateRoute({ children }) {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState();

  if (user.jwt) {
    httpRequest(
      `http://localhost:8081/auth/validate?token=${user.jwt}`,
      "GET",
      user.jwt
    ).then((res) => {
      console.log(res);
      console.log("is valid: " + res);
      setIsValid(res.isValid);
      setIsLoading(false);
    });
  } else {
    return <Navigate to={"/login"} />;
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : isValid === true ? (
    children
  ) : (
    <Navigate to={"/login"} />
  );
}

export default PrivateRoute;
