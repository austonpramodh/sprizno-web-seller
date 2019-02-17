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
  CircularProgress,
} from "@material-ui/core";
import Axios from "axios";
import PropTypes from "prop-types";
import nameConstants from "../../Utils/Constants/nameConstants";
import API from "../../Utils/Network/api";
import styles from "./index.css";
import Toast from "../Toast";
import ErrCodeInterpretter from "../../Utils/ErrCodeInterpretter";

class AddProduct extends Component {
  static meta = { name: nameConstants.ADD_PRODUCT, icon: InboxIcon };

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: "",
      description: "",
      showToast: false,
      toastMessage: null,
      isLoading: false,
    };
  }

  render() {
    const { name, price, description, showToast, toastMessage, isLoading } = this.state;
    const { classes } = this.props;

    const handleOnChange = event => {
      const { value } = event.target;
      const inputName = event.target.name;
      this.setState({ [inputName]: value });
    };

    const handleSubmit = async () => {
      this.setState({ isLoading: true });
      const ProductAPIs = await API.PRODUCT();
      const params = ProductAPIs.ADD;
      params.data = this.state;
      Axios({ ...params })
        .then(res => {
          // err scenarios
          if (res.data.success) {
            this.setState({ name: "", price: "", description: "" });
          } else {
            const { errCode } = res.data;
            this.setState({ showToast: true, toastMessage: ErrCodeInterpretter(errCode) });
          }
          this.setState({ isLoading: false });
        })
        .catch(() => {
          // err scenarios
          this.setState({ showToast: true, toastMessage: ErrCodeInterpretter(0) });
          this.setState({ isLoading: false });
        });
    };
    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <Typography>AddProduct</Typography>
          <FormControl disabled={isLoading} margin="normal" required fullWidth>
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
          <FormControl disabled={isLoading} margin="normal" required fullWidth>
            <InputLabel htmlFor="price">price</InputLabel>
            <Input
              id="price"
              name="price"
              autoComplete="no"
              onChange={handleOnChange}
              value={price}
            />
          </FormControl>
          <FormControl disabled={isLoading} margin="normal" required fullWidth>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input
              id="description"
              name="description"
              autoComplete="no"
              onChange={handleOnChange}
              value={description}
            />
          </FormControl>
          <Button disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? <CircularProgress size={30} /> : "Submit"}
          </Button>
        </Paper>
        <Toast
          variant="error"
          open={showToast}
          message={toastMessage}
          handleClose={() => {
            this.setState({ showToast: false, toastMessage: "" });
          }}
        />
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
