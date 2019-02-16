import React, { Component, Fragment } from "react";
import { MoveToInbox as InboxIcon } from "@material-ui/icons";
import nameConstants from "../../Utils/Constants/nameConstants";

export default class AddProduct extends Component {
  static meta = { name: nameConstants.ADD_PRODUCT, icon: InboxIcon };

  render() {
    return <Fragment>hello world@AddProduct</Fragment>;
  }
}
