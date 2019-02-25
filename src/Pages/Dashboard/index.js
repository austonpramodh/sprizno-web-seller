import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles, AppBar, Toolbar, Typography, Button, IconButton } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import styles from "./index.css";
import Authentication from "../../Utils/Authentication";
import AddProduct from "../../Components/AddProduct";
import ListProducts from "../../Components/ListProducts";
import AppDrawer from "../../Components/AppDrawer";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: "",
      isDrawerOpen: true,
    };
  }

  handleIdSelction = id => {
    this.setState({ selectedId: id });
  };

  render() {
    const componentsList = [ListProducts, AddProduct];
    const { classes } = this.props;
    const { selectedId, isDrawerOpen } = this.state;
    const handleDrawerOpen = () => {
      this.setState({ isDrawerOpen: !isDrawerOpen });
    };

    const handleLogout = () => {
      const { history } = this.props;
      Authentication.logout();
      history.push("/signin");
    };
    const defaultComponent = () => {
      const Component = componentsList[0];
      return <Component />;
    };

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={`${classes.menuIcon}`}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap className={classes.brand}>
              Sprizno
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.toolbar} />
        <AppDrawer isOpen={isDrawerOpen} handleSelction={this.handleIdSelction} />
        <div className={classes.toolbar} />
        <div className={classes.content}>
          <Fragment>
            {selectedId
              ? componentsList.map(Component =>
                  Component.meta.id === selectedId ? <Component /> : "",
                )
              : defaultComponent()}
          </Fragment>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
};
Dashboard.defaultProps = {
  classes: {},
  history: {},
};

export default withStyles(styles)(Dashboard);
