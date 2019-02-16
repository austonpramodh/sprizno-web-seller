import React, { Component, Fragment } from "react";
import { MoveToInbox as InboxIcon } from "@material-ui/icons";
import nameConstants from "../../Utils/Constants/nameConstants";

export default class ListProducts extends Component {
  static meta = { name: nameConstants.LIST_PRODUCTS, icon: InboxIcon };

  render() {
    return <Fragment>hello world@ListProducts</Fragment>;
  }
}
