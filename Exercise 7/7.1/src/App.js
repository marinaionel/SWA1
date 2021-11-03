import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const _username = prompt("What's your name?");
    setUsername(_username);
  }, []);

  const inc = () => setCounter(counter + 1);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello {username}</p>
        <div>
          {" "}
          <button
            onClick={() => {
              setCounter(counter - 1);
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              inc();
            }}
          >
            +
          </button>
        </div>
        <p>{counter}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
