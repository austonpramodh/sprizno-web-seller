const styles = theme =>
  // console.log(theme);
  ({
    paper: {
      maxWidth: "400px",
      margin: "auto",
      marginTop: theme.spacing.unit * 8,
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {},
    typography: {},
    signinButton: {
      height: "40px",
      maxWidth: "200px",
    },
    signupButton: {
      height: "40px",
      margin: "10px",
      maxWidth: "200px",
    },
  });
export default styles;
