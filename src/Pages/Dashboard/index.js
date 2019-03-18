import React from "react";
import PropTypes from "prop-types";
import { withStyles, AppBar, Toolbar, Typography, Button, IconButton } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import styles from "./index.css";
import Authentication from "../../Utils/Authentication";
import ListProducts from "../../Components/ListProducts";
import AppDrawer from "../../Components/AppDrawer";

const componentsList = [ListProducts];
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line no-undef
    const isMobile = window.innerWidth < 700;
    this.state = {
      selectedId: "",
      isDrawerOpen: true && !isMobile,
    };
  }

  handleIdSelction = id => {
    this.setState({ selectedId: id });
  };

  componentDidMount = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    if (id) {
      this.setState({ selectedId: id });
    } else {
      this.setState({ selectedId: componentsList[0].meta.id });
    }
  };

  render() {
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
        <AppDrawer
          isOpen={isDrawerOpen}
          handleSelction={this.handleIdSelction}
          selectedId={selectedId}
        />
        <div>
          <div className={classes.toolbar} />
          <div className={classes.content}>
            {componentsList.map(Component =>
              Component.meta.id === selectedId ? <Component key={Component.meta.id} /> : "",
            )}
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object.isRequired,
};
Dashboard.defaultProps = {
  classes: {},
  history: {},
};

export default withStyles(styles)(Dashboard);
