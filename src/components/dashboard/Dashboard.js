import React, { useState, useEffect } from "react";
import { useLocalState } from "../../utils/useLocalState";
import { Link } from "react-router-dom";
import httpRequest from "../../services/httpRequestService";

function Dashboard() {
  // Use custom useState hook to store jwt in local storage
  const [jwt] = useLocalState("", "jwt");

  // store assignments
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    httpRequest("http://localhost:8081/api/assignments", "GET", jwt).then(
      (assignments) => {
        setAssignments(assignments);
      }
    );
  }, []);

  const createAssignment = () => {
    httpRequest("http://localhost:8081/api/assignments", "POST", jwt).then(
      (assignment) => {
        console.log(assignment);
        window.location.href = `/assignments/${assignment.id}`;
      }
    );
  };

  return (
    <div style={{ margin: "2em" }}>
      {assignments ? (
        assignments.map((assignment) => {
          return (
            <div key={assignment.id}>
              <Link to={`/assignments/${assignment.id}`}>
                Assignment: {assignment.id}
              </Link>
            </div>
          );
        })
      ) : (
        <div>
          <h3>No assignemnt available</h3>
        </div>
      )}
      <button onClick={() => createAssignment()}>Submit Assignment</button>
    </div>
  );
}

export default Dashboard;
