import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import HomePage from "./components/home/HomePage";
import Login from "./components/login/Login";
import PrivateRoute from "./components/privateroute/PrivateRoute";
import AssignmentView from "./components/assignmentview/AssignmentView";

function App() {
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
