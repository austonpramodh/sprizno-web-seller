import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Dashboard from "./Pages/Dashboard";
import RequireAuth from "./Components/RequireAuth";

const App = () => (
  <CssBaseline>
    <Router>
      <Switch>
        <Route path="/signin" exact component={Signin} />
        <Route path="/" exact render={props => <RequireAuth {...props} Component={Dashboard} />} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </Router>
  </CssBaseline>
);

export default App;
