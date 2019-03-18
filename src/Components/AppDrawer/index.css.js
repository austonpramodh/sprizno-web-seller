export default theme => ({
  drawer: {
    width: 240,
    flexShrink: 0,
    transition: "width 300ms ease-in-out",
  },
  drawerPaper: {
    width: 240,
  },
  toolbar: theme.mixins.toolbar,
  nestedListItem: {
    paddingLeft: theme.spacing.unit * 4,
  },
});
