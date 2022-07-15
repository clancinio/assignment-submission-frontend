import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocalState } from "../../utils/useLocalState";

function AssignmentView() {
  // Use custom useState hook to store jwt in local storage
  const [jwt, setJwt] = useLocalState("", "jwt");
  // store assignments
  const [assignment, setAssignment] = useState();
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

  return (
    <div>
      <h1>AssignmentView</h1>
      {assignment ? (
        <>
          <h2>Status: {assignment.status}</h2>
          <h2>
            GitHub URL: <input type="url"></input>
          </h2>
          <h2>
            Branch: <input type="text"></input>
          </h2>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AssignmentView;
