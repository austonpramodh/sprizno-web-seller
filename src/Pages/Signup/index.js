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
import { NavLink, Redirect } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import Styles from "./index.css";
import API from "../../Utils/Network/api";
import errCodeInterpretter from "../../Utils/ErrCodeInterpretter";
import Toast from "../../Components/Toast";
import Authentication from "../../Utils/Authentication";
import errMessagesConstants from "../../Utils/Constants/errMessagesConstants";
import Loader from "../../Components/Loader";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    retypePassword: "",
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
      retypePassword,
      isLoading,
      err,
      errMessage,
      isAuthenticated,
      pageLoading,
    } = this.state;

    const handleOnChange = event => {
      if (err) {
        this.setState({ err: false, errMessage: "" });
      }
      const { name, value } = event.target;
      if (name) {
        this.setState({ [name]: value });
      } else {
        this.setState({ retypePassword: value });
      }
      // console.log("handle on CHnage", this.state);
    };
    const handleSignUp = () => {
      this.setState({ isLoading: true });
      // vaidate
      const params = API.SIGNUP;
      params.data = {
        email,
        password,
      };
      axios({
        method: params.method,
        url: params.url,
        headers: params.headers,
        data: params.data,
      })
        .then(res => {
          // console.log("rrsponse ", res);
          const { data } = res;
          if (!data.success) {
            // err
            this.setState({ err: true, errMessage: errCodeInterpretter(data.errCode) });
          } else {
            // authenticate
            Authentication.authenticate(data.tokens, err1 => {
              if (err1) {
                // er
              } else {
                // redirect
                this.setState({ isLoading: false, isAuthenticated: true });
              }
            });
          }
        })
        .catch(() => {
          // console.log(err1);
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
        {isAuthenticated && <Redirect to="/" />}
        {!pageLoading && !isAuthenticated && (
          <Fragment>
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography className={classes.typography} component="h1" variant="h5">
                Sign Up
              </Typography>
              <FormControl margin="normal" required fullWidth>
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
              <FormControl margin="normal" required fullWidth>
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
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="retypepassword">Retype Password</InputLabel>
                <Input
                  // name="retypePassword"
                  type="password"
                  // id="retypePassword"
                  onChange={handleOnChange}
                  value={retypePassword}
                  autoComplete="off"
                />
              </FormControl>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSignUp}
                className={classes.button}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={30} /> : "Sign up"}
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                // onClick={handleSignup}
                className={classes.signupButton}
              >
                <NavLink
                  to="/"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  Sign In
                </NavLink>
              </Button>
              <Toast
                open={err}
                handleClose={() => {
                  this.setState({ err: false, errMessage: "" });
                }}
              >
                {errMessage}
              </Toast>
            </Paper>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object,
};
Signup.defaultProps = {
  classes: {},
};

export default withStyles(Styles)(Signup);
