import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocalState } from "../../utils/useLocalState";

function AssignmentView() {
  // Use custom useState hook to store jwt in local storage
  const [jwt, setJwt] = useLocalState("", "jwt");
  // store assignments
  const [assignment, setAssignment] = useState({
    gitHubUrl: "",
    branch: "",
  });
  // Get ASsignment id from url param
  const { assignmentId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8081/api/assignments/${assignmentId}`, {
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
      .then((assignment) => {
        console.log(assignment);
        setAssignment(assignment);
      });
  }, []);

  const updateAssignment = (prop, value) => {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
    console.log(assignment);
  };

  const save = () => {
    fetch(`http://localhost:8081/api/assignments/${assignmentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(assignment),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((assignment) => {
        console.log(assignment);
        setAssignment(assignment);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>AssignmentView</h1>
      {assignment ? (
        <>
          <h2>Status: {assignment.status}</h2>
          <h2>
            GitHub URL:{" "}
            <input
              type="url"
              value={assignment.gitHubUrl}
              onChange={(e) => {
                updateAssignment("gitHubUrl", e.target.value);
              }}
            ></input>
          </h2>
          <h2>
            Branch:{" "}
            <input
              type="text"
              value={assignment.branch}
              onChange={(e) => {
                updateAssignment("branch", e.target.value);
              }}
            ></input>
          </h2>
          <button onClick={() => save()}>Submit Assignment</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AssignmentView;
