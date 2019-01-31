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
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Styles from "./index.css";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    retypePassword: "",
  };

  render() {
    const { classes } = this.props;
    const { email, password, retypePassword } = this.state;

    const handleOnChange = event => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };
    const handleSignUp = () => {
      console.log("submitted");
    };
    return (
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
              name="retypepassword"
              type="password"
              id="retypepassword"
              onChange={handleOnChange}
              value={retypePassword}
            />
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignUp}
            className={classes.button}
          >
            Sign Up
          </Button>
        </Paper>
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
