import React, { Fragment } from "react";
import { withStyles, Snackbar, Button, IconButton, SnackbarContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import styles from "./index.css";

const Toast = props => {
  const { classes, children, open, handleCloseButton } = props;

  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleCloseButton}
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
              onClick={handleCloseButton}
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
  children: PropTypes.array,
  open: PropTypes.bool,
  handleCloseButton: PropTypes.func,
};
Toast.defaultProps = {
  classes: {},
  children: [],
  open: false,
  handleCloseButton: () => {},
};

export default withStyles(styles)(Toast);
