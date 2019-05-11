import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Paper,
  withStyles,
  Avatar,
  Typography,
  FormControl,
  Input,
  InputLabel,
  Button,
  CircularProgress,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import { NavLink, Redirect } from "react-router-dom";
import Styles from "./index.css";
import API from "../../Utils/Network/api";
import errCodeInterpretter from "../../Utils/ErrCodeInterpretter";
import Toast from "../../Components/Toast";
import errMessagesConstants from "../../Utils/Constants/errMessagesConstants";
// import Storage from "../../Utils/Storage";
import Authentication from "../../Utils/Authentication";
import Loader from "../../Components/Loader";

// signinRoute test

class Signin extends Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
    err: false,
    errMessage: "",
    isAuthenticated: false,
    pageLoading: true,
  };

  componentWillMount() {
    // console.log("component will mount");
    Authentication.isAuthenticated((err, isAuthenticated) => {
      if (err) {
        // err
      } else this.setState({ isAuthenticated, pageLoading: false });
    });
  }

  render() {
    const { classes } = this.props;
    const {
      email,
      password,
      isLoading,
      errMessage,
      err,
      isAuthenticated,
      pageLoading,
    } = this.state;

    const handleOnChange = event => {
      if (err) {
        this.setState({ errMessage: undefined, err: false });
      }
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };
    const handleSignIn = () => {
      // console.log("requesting");
      this.setState({ isLoading: true });
      const params = API.AUTH.SIGNIN;
      params.data = {
        email,
        password,
      };
      // console.log("params ", params);
      axios({
        method: params.method,
        url: params.url,
        headers: params.headers,
        data: params.data,
      })
        .then(res => {
          const { data } = res;
          if (!data.success) {
            this.setState({ err: true, errMessage: errCodeInterpretter(data.errCode) });
          } else {
            // console.log("successFul");
            // store token
            Authentication.authenticate(data.tokens, err1 => {
              if (err1) {
                // console.log("err", err1);
                this.setState({ err: true, errMessage: errCodeInterpretter(err1.errCode) });
              } else {
                // console.log("all OK");
                this.setState({ isLoading: false, isAuthenticated: true });
                // redirect to dashboard
              }
            });
          }
          this.setState({ isLoading: false });
        })
        .catch(() => {
          this.setState({
            err: true,
            errMessage: errMessagesConstants.NETWORK_ERROR,
            isLoading: false,
          });
        });
    };
    return (
      <Fragment>
        {pageLoading && <Loader />}
        {!pageLoading && isAuthenticated && <Redirect to="/" />}
        {!pageLoading && !isAuthenticated && (
          <Fragment>
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography className={classes.typography} component="h1" variant="h5">
                Sign In
              </Typography>
              <FormControl disabled={isLoading} margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleOnChange}
                  value={email}
                />
              </FormControl>
              <FormControl disabled={isLoading} margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleOnChange}
                  value={password}
                />
              </FormControl>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSignIn}
                disabled={isLoading}
                className={classes.signinButton}
              >
                {isLoading ? <CircularProgress size={30} /> : "Sign in"}
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                // onClick={handleSignup}
                className={classes.signupButton}
              >
                <NavLink
                  to="/signup"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  Register
                </NavLink>
              </Button>
              <Toast
                variant="error"
                message={errMessage}
                open={err}
                handleClose={() => {
                  this.setState({ err: false, errMessage: "" });
                }}
              />
            </Paper>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

Signin.propTypes = {
  classes: PropTypes.object,
};
Signin.defaultProps = {
  classes: {},
};

export default withStyles(Styles)(Signin);
