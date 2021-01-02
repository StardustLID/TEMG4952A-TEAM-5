import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Investments from "./pages/Investments";
import Companies from "./pages/Companies";
import Settings from "./pages/Settings";
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
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Home title={title} />} />
          <Route path="/companies" component={Companies} />
          <Route path="/investments" component={Investments} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
