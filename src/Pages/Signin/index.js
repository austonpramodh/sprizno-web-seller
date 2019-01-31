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
  FormControlLabel,
  Checkbox,
  Button,
  CircularProgress,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import Styles from "./index.css";
import api from "../../Utils/Network/api";
import errCodeInterpretter from "../../Utils/ErrCodeInterpretter";
import Toast from "../../Components/Toast";
import errMessagesConstants from "../../Utils/Constants/errMessagesConstants";

class Signin extends Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
    errMessage: "",
  };

  render() {
    const { classes } = this.props;
    const { email, password, isLoading, errMessage } = this.state;

    const handleOnChange = event => {
      if (errMessage) {
        this.setState({ errMessage: undefined });
      }
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };
    const handleSignIn = () => {
      console.log("requesting");
      const params = api.SIGNIN;
      params.data = {
        email,
        password,
      };
      // set isLoading state
      // prepare data obj
      // hit Api request
      // get Token
      this.setState({ isLoading: true });
      console.log("params ", params);
      axios({
        method: params.method,
        url: params.url,
        headers: params.headers,
        data: params.data,
      })
        .then(res => {
          console.log("rrsponse ", res);
          const { data } = res;
          console.log("data ", data);
          if (!data.success) {
            console.log("errcode ", res.data.errCode);
            this.setState({ errMessage: errCodeInterpretter(data.errCode) });
          } else {
            console.log("successFul");
            // store token
            // route to dashboard
          }
          this.setState({ isLoading: false });
        })
        .catch(err1 => {
          console.log(err1);
          this.setState({ errMessage: errMessagesConstants.NETWORK_ERROR });
          this.setState({ isLoading: false });
        });
    };
    return (
      <Fragment>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography className={classes.typography} component="h1" variant="h5">
            Sign In
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignIn}
            disabled={isLoading}
            className={classes.button}
          >
            {isLoading ? <CircularProgress size={30} /> : "Sign in"}
          </Button>
          <Toast
            open={errMessage}
            handleCloseButton={() => {
              this.setState({ errMessage: "" });
            }}
          >
            {errMessage}
          </Toast>
        </Paper>
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
