import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import httpRequest from "../../services/httpRequestService";
import { useLocalState } from "../../utils/useLocalState";

function AssignmentView() {
  // Use custom useState hook to store jwt in local storage
  const [jwt] = useLocalState("", "jwt");
  // store assignments
  const [assignment, setAssignment] = useState({
    gitHubUrl: "",
    branch: "",
  });
  // Get ASsignment id from url param
  const { assignmentId } = useParams();

  useEffect(() => {
    httpRequest(
      `http://localhost:8081/api/assignments/${assignmentId}`,
      "GET",
      jwt
    ).then((assignment) => {
      if (assignment.branch === null) {
        assignment.branch = "";
      }
      if (assignment.gitHubUrl === null) {
        assignment.gitHubUrl = "";
      }
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
    httpRequest(
      `http://localhost:8081/api/assignments/${assignmentId}`,
      "PUT",
      jwt,
      assignment
    ).then((assignmentData) => {
      setAssignment(assignmentData);
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
