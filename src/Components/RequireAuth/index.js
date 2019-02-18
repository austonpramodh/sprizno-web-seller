import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./index.css";
import Authentication from "../../Utils/Authentication";
import Loader from "../Loader";

class RequireAuth extends React.Component {
  state = {
    loading: true,
    isAuthenticated: false,
  };

  componentDidMount() {
    Authentication.isAuthenticated((err, isAuthenticated) => {
      // console.log("i am on it at Authentication CB");

      if (err) {
        // err
        // console.log("amn Error", err);
      } else {
        this.setState({ loading: false, isAuthenticated });
      }
    });
  }

  render() {
    const { loading, isAuthenticated } = this.state;
    const { Component } = this.props;
    return (
      <Fragment>
        {loading && (
          <Fragment>
            <Loader />
          </Fragment>
        )}
        {!loading && isAuthenticated && (
          <Fragment>
            <Component {...this.props} />
          </Fragment>
        )}
        {!loading && !isAuthenticated && <Redirect to="/signin" />}
      </Fragment>
    );
  }
}

RequireAuth.propTypes = {
  classes: PropTypes.object,
  Component: PropTypes.func,
};

RequireAuth.defaultProps = {
  classes: {},
  Component: () => {},
};

export default withStyles(styles)(RequireAuth);
