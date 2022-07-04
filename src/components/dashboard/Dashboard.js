import React from "react";
import { useLocalState } from "../../utils/useLocalState";

function Dashboard() {
  // Use custom useState hook to store jwt in local storage
  const [jwt, setJwt] = useLocalState("", "jwt");

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello</h1>
        <p>JWT is: {jwt}</p>
      </header>
    </div>
  );
}

export default Dashboard;
