import React from "react";
import { useLocalState } from "../../utils/useLocalState";

function Login() {
  const [jwt, setJwt] = useLocalState("", "jwt");

  const getToken = () => {
    if (!jwt) {
      const requestBody = {
        username: "dean",
        password: "password",
      };

      fetch("http://localhost:8081/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          setJwt(data.jwtToken);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <form>
      <div class="form-outline mb-4">
        <input type="email" id="form2Example1" class="form-control" />
        <label class="form-label" for="form2Example1">
          Email address
        </label>
      </div>

      <div class="form-outline mb-4">
        <input type="password" id="form2Example2" class="form-control" />
        <label class="form-label" for="form2Example2">
          Password
        </label>
      </div>

      <button type="button" class="btn btn-primary btn-block mb-4">
        Sign in
      </button>

      <button
        onClick={() => getToken()}
        type="button"
        class="btn btn-primary btn-block mb-4"
      >
        {" "}
        Get jwt
      </button>

      <div class="text-center">
        <p>
          Not a member? <a href="#!">Register</a>
        </p>
      </div>
    </form>
  );
}

export default Login;
