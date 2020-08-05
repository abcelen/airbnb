import React from "react";
import Form from "./Form"
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Search for the best rooms and apartments, all powered by mongodb</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          By: abcelen
        </a>
      </header>
      <Form />
    </div>
  );
}

export default App;
