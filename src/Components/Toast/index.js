import React, { Fragment } from "react";
import { withStyles, Snackbar, IconButton, SnackbarContent } from "@material-ui/core";
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
} from "@material-ui/icons";
import PropTypes from "prop-types";
import styles from "./index.css";

const Toast = props => {
  const { classes, message, open, handleClose, variant } = props;
  // button
  // variant
  const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };
  const Icon = variantIcon[variant];

  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
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
};
Toast.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]),
  message: PropTypes.string,
};
Toast.defaultProps = {
  classes: {},
  open: false,
  handleClose: () => {},
  variant: "info",
  message: "Message Empty",
};

export default withStyles(styles)(Toast);
