import "./App.css";
import React from "react";
import { useEffect } from "react";
import { useLocalState } from "./utils/useLocalState";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import HomePage from "./components/home/HomePage";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");

  useEffect(() => {
    // If there is no jwt set, then go fetch one
    if (!jwt) {
      const requestBody = {
        username: "jon",
        password: "asdfasdf",
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
        });
    }
  }, []);

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
