const styles = theme => ({
  fullScreenContainer: {
    width: "100px",
    height: "100px",
    margin: "auto",
    position: "absolute",
    top: "0",
    bottom: "0",
    right: "0",
    left: "0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});
export default styles;
