import React, { Component, Fragment } from "react";
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
} from "@material-ui/core";
import styles from "./index.css";
import Authentication from "../../Utils/Authentication";
import AddProduct from "../../Components/AddProduct";
import ListProducts from "../../Components/ListProducts";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  render() {
    const componentsList = [AddProduct, ListProducts];
    const Components = componentsList.map(Item => <Item />);
    const { classes } = this.props;
    const { selectedIndex } = this.state;
    const handleClick = key => {
      this.setState({ selectedIndex: key });
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
          variant="permanent"
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
          <Fragment>{Components[selectedIndex]}</Fragment>
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
