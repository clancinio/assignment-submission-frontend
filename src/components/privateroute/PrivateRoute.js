import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import httpRequest from "../../services/httpRequestService";
import { useLocalState } from "../../utils/useLocalState";

function PrivateRoute({ children }) {
  const [jwt] = useLocalState("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  if (jwt) {
    httpRequest(
      `http://localhost:8081/auth/validate?token=${jwt}`,
      "GET",
      jwt
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
