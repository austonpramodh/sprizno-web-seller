import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core";
// import { Redirect } from "react-router-dom";
import styles from "./index.css";
import Authentication from "../../Utils/Authentication";

const handleLogout = props => {
  // console.log("props", props);
  Authentication.logout();
  props.history.push("/signin");
};
const Dashboard = props => (
  <Fragment>
    Dashboard
    <button type="button" onClick={() => handleLogout(props)}>
      logout
    </button>
  </Fragment>
);

export default withStyles(styles)(Dashboard);
