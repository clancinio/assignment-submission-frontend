import React from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const sendLoginReq = () => {
    console.log(username);

    const reqBody = {
      username: username,
      password: password,
    };

    fetch("http://localhost:8081/auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200)
          return Promise.all([response.json(), response.headers]);
        else return Promise.reject("Invalid login attempt");
      })
      .then(([body, headers]) => {
        setJwt(body.jwtToken);
        window.location.href = "dashboard";
      })
      .catch((message) => {
        alert(message);
      });
  };

  return (
    <Container>
      <div className="form-style">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
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
            <Button
              onClick={() => sendLoginReq()}
              variant="primary"
              type="button"
              className="mr-3"
            >
              Sign in
            </Button>
          </Col>
        </Row>

        <div className="text-center mt-3">
          <p>
            Not a member? <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </div>
    </Container>
  );
}

export default Login;
