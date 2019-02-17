import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  List,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  IconButton,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import styles from "./index.css";
import Authentication from "../../Utils/Authentication";
import AddProduct from "../../Components/AddProduct";
import ListProducts from "../../Components/ListProducts";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      isDrawerOpen: true,
    };
  }

  render() {
    const componentsList = [ListProducts, AddProduct];
    const { classes } = this.props;
    const { selectedIndex, isDrawerOpen } = this.state;
    const handleClick = key => {
      this.setState({ selectedIndex: key });
    };
    const handleDrawerOpen = () => {
      this.setState({ isDrawerOpen: !isDrawerOpen });
    };

    const handleLogout = () => {
      const { history } = this.props;
      Authentication.logout();
      history.push("/signin");
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
        <Drawer
          className={classes.drawer}
          variant="persistent"
          open={isDrawerOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>
            {componentsList.map((item, key) => (
              <ListItem
                selected={key === selectedIndex}
                button
                key={item.meta.name}
                onClick={() => {
                  handleClick(key);
                }}
              >
                <ListItemIcon>{<item.meta.icon />}</ListItemIcon>
                <ListItemText primary={item.meta.name} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <Fragment>
            {componentsList.map((Component, key) =>
              key === selectedIndex ? <Component key={Component.meta.name} /> : "",
            )}
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
