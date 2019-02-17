import React, { Component } from "react";
import { MoveToInbox as InboxIcon } from "@material-ui/icons";
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
  withStyles,
} from "@material-ui/core";
import Axios from "axios";
import PropTypes from "prop-types";
import nameConstants from "../../Utils/Constants/nameConstants";
import API from "../../Utils/Network/api";
import styles from "./index.css";

class AddProduct extends Component {
  static meta = { name: nameConstants.ADD_PRODUCT, icon: InboxIcon };

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: "",
      description: "",
    };
  }

  render() {
    const { name, price, description } = this.state;
    const { classes } = this.props;

    const handleOnChange = event => {
      const { value } = event.target;
      const inputName = event.target.name;
      this.setState({ [inputName]: value });
    };

    const handleSubmit = async () => {
      const ProductAPIs = await API.PRODUCT();
      const params = ProductAPIs.ADD;
      params.data = this.state;
      Axios({ ...params })
        .then(() => {
          // err scenarios
          this.setState({ name: "", price: "", description: "" });
        })
        .catch(() => {
          // err scenarios
        });
    };
    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <Typography>AddProduct</Typography>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              name="name"
              autoComplete="no"
              autoFocus
              onChange={handleOnChange}
              value={name}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="price">price</InputLabel>
            <Input
              id="price"
              name="price"
              autoComplete="no"
              autoFocus
              onChange={handleOnChange}
              value={price}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input
              id="description"
              name="description"
              autoComplete="no"
              autoFocus
              onChange={handleOnChange}
              value={description}
            />
          </FormControl>
          <Button onClick={handleSubmit}>Submit</Button>
        </Paper>
      </div>
    );
  }
}

AddProduct.propTypes = {
  classes: PropTypes.object,
};
AddProduct.defaultProps = {
  classes: {},
};

export default withStyles(styles)(AddProduct);
