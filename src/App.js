import "./App.css";
import React from "react";
import { useLocalState } from "./utils/useLocalState";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import HomePage from "./components/home/HomePage";
import Login from "./components/login/Login";
import PrivateRoute from "./components/privateroute/PrivateRoute";
import AssignmentView from "./components/assignmentview/AssignmentView";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");

  // useEffect(() => {
  //   // If there is no jwt set, then go fetch one
  //   if (!jwt) {
  //     const requestBody = {
  //       username: "dean",
  //       password: "password",
  //     };

  //     fetch("http://localhost:8081/auth", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(requestBody),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setJwt(data.jwtToken);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, []);

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/assignments/:assignmentId"
        element={
          <PrivateRoute>
            <AssignmentView />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
