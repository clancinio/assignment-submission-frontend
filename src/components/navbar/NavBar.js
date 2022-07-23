import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router";
import { useLocalState } from "../../utils/useLocalState";

function NavBar() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const navigate = useNavigate();

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Assignment App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a
              onClick={() => {
                localStorage.removeItem("jwt");
                navigate("/login");
              }}
            >
              Logout
            </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
