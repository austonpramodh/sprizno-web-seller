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
  CircularProgress,
  Select,
  MenuItem,
} from "@material-ui/core";
import Dropzone from "react-dropzone";
import Styles from "./index.css";
import uploadImages from "../../Utils/Network/uploadImages";
import { Consumer } from "../ListProducts";
import API from "../../Utils/Network/api";
import request from "../../Utils/Network/request";

const AddProductCard = ({ classes }) => {
  const inputMinMax = {
    stock: {
      min: 1,
      max: 999,
    },
    price: {
      min: 1,
      max: 9999,
    },
  };
  const getIntialInputState = () => ({
    name: "",
    price: "",
    description: "",
    acceptedFiles: [],
    stockAvailable: 0,
    category: 0,
  });

  const getIntialState = () => ({
    categories: [],
    isProductAdding: false,
  });
  const [inputValues, setInputs] = React.useState(getIntialInputState());
  const [state, setState] = React.useState(getIntialState());

  const getAllCategories = async () => {
    const params = API.PRODUCT.CATEGORIES_LIST;
    const response = await request(params);
    if (response.success) {
      const categories = response.data.map(x => x.name);
      setState({ ...state, categories });
    }
  };

  React.useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Consumer>
      {context => {
        const { contextState, changeContextState } = context;

        const handleInputChange = e => {
          const { name, value } = e.target;
          setInputs({ ...inputValues, [name]: value });
        };

        const handleAddButton = async () => {
          setState({ ...state, isProductAdding: true });
          const { acceptedFiles, name, price, description, stockAvailable, category } = inputValues;
          const { categories } = state;
          let imageNames = [];
          if (acceptedFiles.length > 0) {
            imageNames = await uploadImages(acceptedFiles);
            if (imageNames.length === 0) return null;
          }
          const data = {
            name,
            price,
            imageNames,
            description,
            stock: stockAvailable,
            category: categories[category - 1],
          };
          const params = API.PRODUCT.ADD;
          params.data = { ...data };
          const response = await request(params);
          if (response && response.success && response.data) {
            changeContextState({
              ...contextState,
              products: [...contextState.products, response.data],
            });
            // update loading button
            setInputs(getIntialInputState());
          } else {
            // show error
          }
          setState({ ...state, isProductAdding: false });
          return null;
        };

        const handleOnDrop = acceptedFiles => {
          setInputs({
            ...inputValues,
            acceptedFiles: [...inputValues.acceptedFiles, ...acceptedFiles],
          });
        };

        const handleClearFiles = e => {
          e.stopPropagation();
          setInputs({ ...inputValues, acceptedFiles: [] });
        };

        const { name, stockAvailable, acceptedFiles, description, price, category } = inputValues;
        const { isProductAdding, categories } = state;
        return (
          <Card className={classes.card}>
            <div className={classes.cardHeader}>
              <FormControl>
                <InputLabel>Product Name</InputLabel>
                <Input value={name} name="name" onChange={handleInputChange} />
              </FormControl>
              <FormControl className={classes.stockInput}>
                <InputLabel>Stock</InputLabel>
                <Input
                  value={stockAvailable === 0 ? "" : stockAvailable}
                  name="stockAvailable"
                  onChange={handleInputChange}
                  type="number"
                  inputProps={inputMinMax.stock}
                />
              </FormControl>
            </div>
            <div className={classes.media}>
              <Dropzone onDropAccepted={handleOnDrop} accept="image/*">
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
                        <Button onClick={handleClearFiles}>clear Files</Button>
                      </Fragment>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>
            <CardContent>
              <FormControl className={classes.descriptionInput}>
                <InputLabel>Description</InputLabel>
                <Input value={description} name="description" onChange={handleInputChange} />
              </FormControl>
            </CardContent>
            <CardActions className={classes.actions}>
              <FormControl className={classes.priceInput}>
                <InputLabel>Price</InputLabel>
                <Input
                  type="number"
                  value={price}
                  name="price"
                  onChange={handleInputChange}
                  inputProps={inputMinMax.price}
                />
              </FormControl>
              <FormControl className={classes.categorySelector}>
                <InputLabel>Category</InputLabel>
                <Select value={category} onChange={handleInputChange} name="category">
                  <MenuItem disabled value={0}>
                    <em className={classes.menuItemText} style={{}}>
                      Select
                    </em>
                  </MenuItem>
                  {categories.map((x, index) => (
                    <MenuItem value={index + 1} key={x}>
                      <em className={classes.menuItemText}>{x}</em>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button className={classes.button} onClick={handleAddButton}>
                {isProductAdding ? <CircularProgress size={30} /> : "Add"}
              </Button>
            </CardActions>
          </Card>
        );
      }}
    </Consumer>
  );
};

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
