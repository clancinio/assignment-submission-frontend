import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import HomePage from "./components/home/HomePage";
import Login from "./components/login/Login";
import PrivateRoute from "./components/privateroute/PrivateRoute";
import AssignmentView from "./components/assignmentview/AssignmentView";
import jwt_decode from "jwt-decode";
import CodeReviewerDashboard from "./components/codereviewerdashboard/CodeReviewerDashboard";
import ReviewerAssignmentView from "./components/reviewerassignmentview/ReviewerAssignmentView";
import { useUser } from "./components/user-context/UserContext";

function App() {
  const user = useUser();
  const [roles, seRole] = useState(getRolesFromJwt());

  function getRolesFromJwt() {
    if (user.jwt) {
      var decoded = jwt_decode(user.jwt);
      return decoded.authorities;
    }
    return [];
  }

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
            <PrivateRoute>
              <CodeReviewerDashboard />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          )
        }
      />
      <Route
        path="/assignments/:assignmentId"
        element={
          roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
            <PrivateRoute>
              <ReviewerAssignmentView />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <AssignmentView />
            </PrivateRoute>
          )
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
