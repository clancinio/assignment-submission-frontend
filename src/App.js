import "./App.css";

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
    console.log(data);
  });

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello</h1>
      </header>
    </div>
  );
}

export default App;
