import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useLocalState } from "../../utils/useLocalState";

function Login() {
  const [jwt, setJwt] = useLocalState("", "jwt");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getToken = () => {
    window.localStorage.removeItem("jwt");

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
    <Container>
      <Form className="form-style">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="joe@gmail.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Row>
          <Col className="d-flex flex-column gap-2">
            <Button variant="primary" type="submit" className="mr-3">
              Sign in
            </Button>

            <Button
              onClick={() => getToken()}
              type="button"
              variant="secondary"
            >
              {" "}
              Get new jwt
            </Button>
          </Col>
        </Row>

        <div class="text-center mt-3">
          <p>
            Not a member? <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
