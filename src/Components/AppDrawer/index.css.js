export default theme => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  toolbar: theme.mixins.toolbar,
  nestedListItem: {
    paddingLeft: theme.spacing.unit * 4,
  },
});
