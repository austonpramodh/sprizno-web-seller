/* eslint-disable  */
import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import { withStyles, Snackbar, IconButton, SnackbarContent } from "@material-ui/core";
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
} from "@material-ui/icons";
import styles from "./index.css";

const ToastView = withStyles(styles)(({ message, Icon, classes, variant }) => {
  const [state, handleState] = useState({ open: true });
  const handleClose = () => {
    handleState({ ...state, open: false });
  };
  // useEffect(() => {
  //   console.log("useState: ", state);
  //   handleState({ open: ranFirst });
  //   ranFirst = !ranFirst;
  // });

  setTimeout(handleClose, 2000);
  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={state.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <SnackbarContent
          className={classes[variant]}
          message={
            <span className={classes.message}>
              <Icon className={`${classes.icon} ${classes.iconVariant}`} />
              {message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    </Fragment>
  );
});

class ToastClass extends React.Component {
  componentDidMount() {
    console.log("compoennt Mounted");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  state = {
    open: true,
  };

  render() {
    const handleClose = () => {
      this.setState({ open: false });
      console.log(this.props);
    };
    const { classes, message, variant, Icon } = this.props;
    return (
      <Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <SnackbarContent
            className={classes[variant]}
            message={
              <span className={classes.message}>
                <Icon className={`${classes.icon} ${classes.iconVariant}`} />
                {message}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={handleClose}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>,
            ]}
          />
        </Snackbar>
      </Fragment>
    );
  }
}

const ToastFunc = ({ message, variant }) => {
  console.log("calledToast");
  const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };
  const Icon = variantIcon[variant];
  ReactDOM.render(
    <ToastView message={message} Icon={Icon} variant={variant} />,
    document.getElementById("toast"),
  );
};

export default ToastFunc;
