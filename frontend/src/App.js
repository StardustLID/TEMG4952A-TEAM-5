import { useState, useEffect } from "react";
import Navbar from "./pages/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Home from "./pages/Home";
import Investments from "./pages/Investments";
import Companies from "./pages/Companies";
import "./App.css";
import muiTheme from "./theme/muiTheme";

function App() {
  /*
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
  */

  return (
    <>
      <Router>
        <MuiThemeProvider theme={muiTheme}>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/companies" component={Companies} />
            <Route path="/investments" component={Investments} />
          </Switch>
        </MuiThemeProvider>
      </Router>
    </>
  );
}

export default App;
