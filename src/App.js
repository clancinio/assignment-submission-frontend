import "./App.css";
import { useEffect } from "react";
import useLocalState from "./utils/useLocalState";

function App() {
  // Use custom useState hook to store jwt in local storage
  const [jwt, setJwt] = useLocalState("", "jwt");

  useEffect(() => {
    // If there is no jwt set, then go fetch one
    if (!jwt) {
      const requestBody = {
        username: "jon",
        password: "asdfasdf",
      };

      fetch("http://localhost:8081/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          setJwt(data.jwtToken);
        });
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello</h1>
        <p>JWT is: {jwt}</p>
      </header>
    </div>
  );
}

export default App;
