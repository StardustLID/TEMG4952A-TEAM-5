import React, { useState, useEffect } from "react";
import Navbar from "./pages/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Home from "./pages/Home";
import Investments from "./pages/Investments";
import Companies from "./pages/Companies";
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
  }, []);

  // Material UI custom palette (https://material-ui.com/customization/palette/)
  const theme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        light: "#E60100",
        main: "#941a1a",
      },
    },
  });

  return (
    <>
      <Router>
        <MuiThemeProvider theme={theme}>
          <Navbar />
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/companies" component={Companies} />
            <Route path="/investments" component={Investments} />
          </Switch>
        </MuiThemeProvider>
      </Router>
    </>
  );
}

export default App;
