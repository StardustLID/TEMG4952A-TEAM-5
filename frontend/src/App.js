import { useState, useEffect } from "react";
import Navbar from "./pages/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Home from "./pages/Home";
import Investments from "./pages/Investments";
import Companies from "./pages/Companies";
import Features from "./pages/Features";
import muiTheme from "./theme/muiTheme";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <MuiThemeProvider theme={muiTheme}>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/features" component={Features} />
            <Route path="/companies" component={Companies} />
            <Route path="/investments" component={Investments} />
          </Switch>
        </MuiThemeProvider>
      </Router>
    </>
  );
}

export default App;
