import React, { Fragment } from "react";
import { withStyles, Snackbar, IconButton, SnackbarContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import styles from "./index.css";

const Toast = props => {
  const { classes, children, open, handleClose } = props;
  // button
  // variant

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
          className={classes.toastContent}
          message={children}
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
  children: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
Toast.defaultProps = {
  classes: {},
  children: [],
  open: false,
  handleClose: () => {},
};

export default withStyles(styles)(Toast);
