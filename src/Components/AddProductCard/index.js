/* eslint-disable no-underscore-dangle */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Card,
  withStyles,
  CardContent,
  CardActions,
  Button,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import Dropzone from "react-dropzone";
import Styles from "./index.css";
import uploadImages from "../../Utils/Network/uploadImages";

class AddProductCard extends React.Component {
  state = {
    name: "",
    price: "",
    description: "",
    acceptedFiles: [],
    quantityInStock: 0,
  };

  handleAddButton = async () => {
    const { addFunc } = this.props;
    const { acceptedFiles, name, price, description, quantityInStock } = this.state;
    if (acceptedFiles.length > 0) {
      const imageNames = await uploadImages(acceptedFiles);
      const data = {
        name,
        price,
        imageNames,
        description,
        quantityInStock,
      };
      addFunc(data);
    }
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleOnDrop = acceptedFiles => {
    this.setState(prevState => ({ acceptedFiles: [...prevState.acceptedFiles, ...acceptedFiles] }));
  };

  handleClearFiles = e => {
    e.stopPropagation();
    this.setState({ acceptedFiles: [] });
  };

  render() {
    const { classes } = this.props;
    const {
      name,
      acceptedFiles,
      price,
      description,
      isProductAdding,
      quantityInStock,
    } = this.state;
    return (
      <Card className={classes.card}>
        <div className={classes.cardHeader}>
          <FormControl>
            <InputLabel>Product Name</InputLabel>
            <Input value={name} name="name" onChange={this.handleInputChange} />
          </FormControl>
          <FormControl className={classes.stockInput}>
            <InputLabel>Stock</InputLabel>
            <Input
              value={quantityInStock === 0 ? "" : quantityInStock}
              name="quantityInStock"
              onChange={this.handleInputChange}
              type="number"
            />
          </FormControl>
        </div>
        <div className={classes.media}>
          <Dropzone onDropAccepted={this.handleOnDrop} accept="image/*">
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div {...getRootProps()} className={`${classes.dropzoneContainer}`}>
                <input {...getInputProps()} />
                {isDragActive && <p>Drop files here...</p>}
                {!isDragActive && acceptedFiles.length === 0 && (
                  <p>Try dropping some Pictures here, or click to select files to upload.</p>
                )}
                {acceptedFiles.length > 0 && !isDragActive && (
                  <Fragment>
                    No of accepted files: {acceptedFiles.length}{" "}
                    <Button onClick={this.handleClearFiles}>clear Files</Button>
                  </Fragment>
                )}
              </div>
            )}
          </Dropzone>
        </div>
        <CardContent>
          <FormControl className={classes.descriptionInput}>
            <InputLabel>Description</InputLabel>
            <Input value={description} name="description" onChange={this.handleInputChange} />
          </FormControl>
        </CardContent>
        <CardActions className={classes.actions}>
          <div className={classes.priceContainer}>
            <FormControl>
              <InputLabel>Price</InputLabel>
              <Input value={price} name="price" onChange={this.handleInputChange} />
            </FormControl>
          </div>
          <Button onClick={this.handleAddButton}>{isProductAdding ? "Loading" : "Add"}</Button>
        </CardActions>
      </Card>
    );
  }
}

AddProductCard.propTypes = {
  classes: PropTypes.object,
  addFunc: PropTypes.func,
  isProductAdding: PropTypes.bool,
};
AddProductCard.defaultProps = {
  classes: {},
  addFunc: () => {},
  isProductAdding: false,
};

export default withStyles(Styles)(AddProductCard);
