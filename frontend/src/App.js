import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("Flask API not working!"); // A state to store the title of our page

  // We set the title of the page to be the message we fetch from our Flask API
  // That API returns {'message': 'Flask is working!'}
  useEffect(() => {
    fetch("/react") // Route defined in backend\app.py line 10
      .then((res) => res.json())
      .then((data) => {
        // data = {'message': 'Flask is working!'}
        setTitle(data.message);
      });
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>{title}</h1>
        <p>
          Read the code of <code>frontend/src/App.js</code> for more
        </p>
      </header>
    </div>
  );
}

export default App;
