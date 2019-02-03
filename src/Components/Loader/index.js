import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./index.css";

const Loader = props => {
  const { classes } = props;
  return (
    <div className={classes.fullScreenContainer}>
      <CircularProgress className={classes.progress} />
    </div>
  );
};

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);
