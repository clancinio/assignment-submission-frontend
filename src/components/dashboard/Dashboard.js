import React from "react";
import { useLocalState } from "../../utils/useLocalState";

function Dashboard() {
  // Use custom useState hook to store jwt in local storage
  const [jwt, setJwt] = useLocalState("", "jwt");

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
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div style={{ margin: "2em" }}>
      <button onClick={() => createAssignment()}>Submit Assignment</button>
    </div>
  );
}

export default Dashboard;
