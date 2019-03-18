import React, { Fragment } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
  Collapse,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import ListItems from "./listItems";

import styles from "./index.css";

class AppDrawer extends React.Component {
  constructor() {
    super();
    this.state = {
      listStates: this.getInitialStateOfList(),
    };
    // console.log(ListItems);
  }

  getInitialStateOfList = () => {
    // const { listItems } = this.props;
    let state = {};
    ListItems.map(element => {
      if (element.childItems) {
        state = { ...state, [element.id]: { isOpen: false } };
        element.childItems.map(elementX => {
          state = {
            ...state,
            [element.id]: {
              ...state[element.id],
              [elementX.id]: false,
            },
          };
          return null;
        });
      } else {
        state = { ...state, [element.id]: false };
      }
      return null;
    });
    return state;
  };

  handleListItemExpand = e => {
    const { id } = e.currentTarget;
    this.setState(prevState => ({
      listStates: {
        ...prevState.listStates,
        [id]: { ...prevState.listStates[id], isOpen: !prevState.listStates[id].isOpen },
      },
    }));
  };

  handleListItemClick = e => {
    const { id } = e.currentTarget;
    const { handleSelction } = this.props;
    handleSelction(id);
  };

  render() {
    const { classes, isOpen } = this.props;
    const { listStates } = this.state;
    // eslint-disable-next-line no-undef
    const isMobile = window.innerWidth < 700;
    return (
      <Fragment>
        <Drawer
          open={isOpen}
          className={classes.drawer}
          style={{ width: !isOpen || isMobile ? 0 : "240px" }}
          variant="persistent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>
            {ListItems.map(element => {
              if (element.childItems) {
                return (
                  <Fragment key={`${element.name}2`}>
                    <ListItem button onClick={this.handleListItemExpand} id={element.id}>
                      <ListItemIcon>
                        <element.icon />
                      </ListItemIcon>
                      <ListItemText>{element.name}</ListItemText>
                      {listStates[element.id].isOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={listStates[element.id].isOpen}>
                      <List component="div" disablePadding>
                        {element.childItems.map(elementX => (
                          <ListItem
                            id={elementX.id}
                            className={classes.nestedListItem}
                            button
                            key={elementX.name}
                            onClick={this.handleListItemClick}
                          >
                            {elementX.icon ? (
                              <ListItemIcon>
                                <elementX.icon />
                              </ListItemIcon>
                            ) : (
                              ""
                            )}
                            <ListItemText>{elementX.name}</ListItemText>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </Fragment>
                );
              }
              return (
                <ListItem
                  id={element.id}
                  button
                  key={element.name}
                  onClick={this.handleListItemClick}
                >
                  <ListItemIcon>
                    <element.icon />
                  </ListItemIcon>
                  <ListItemText>{element.name}</ListItemText>
                </ListItem>
              );
            })}
          </List>
        </Drawer>
      </Fragment>
    );
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object,
  handleSelction: PropTypes.func,
  isOpen: PropTypes.bool,
};
AppDrawer.defaultProps = {
  classes: {},
  handleSelction: () => {},
  isOpen: true,
};

export default withStyles(styles)(AppDrawer);
