import React, { useState, useEffect } from "react";
import { useLocalState } from "../../utils/useLocalState";
import { Link } from "react-router-dom";

function Dashboard() {
  // Use custom useState hook to store jwt in local storage
  const [jwt, setJwt] = useLocalState("", "jwt");

  // store assignments
  const [assignments, setAssignments] = useState();

  useEffect(() => {
    fetch("http://localhost:8081/api/assignments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((assignments) => {
        console.log(assignments);
        setAssignments(assignments);
      });
  }, []);

  const createAssignment = () => {
    fetch("http://localhost:8081/api/assignments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((assignment) => {
        console.log(assignment);
        window.location.href = `/assignments/${assignment.id}`;
      });
  };

  return (
    <div style={{ margin: "2em" }}>
      {assignments ? (
        assignments.map((assignment) => {
          return (
            <div>
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
