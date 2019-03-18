/* eslint-disable no-underscore-dangle */
import React, { Component, Fragment } from "react";
import { Grid, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import API from "../../Utils/Network/api";
import Loader from "../Loader";
import request from "../../Utils/Network/request";
import idConstants from "../../Utils/Constants/idConstants";
import ProductCard from "../ProductCard";
import Styles from "./index.css";
import AddProductCard from "../AddProductCard";

class ListProducts extends Component {
  static meta = { id: idConstants.LIST_PRODUCTS };

  state = {
    products: [],
    isPageLoading: true,
    deletingCardId: "",
    isProductAdding: false,
  };

  componentDidMount() {
    // request APi and get data
    this.getAllProducts();
  }

  getAllProducts = async () => {
    const params = API.PRODUCT.GET_ALL;
    const response = await request(params);
    if (response.data) {
      if (response.data.success) {
        this.setState({ products: response.data.data, isPageLoading: false });
      } // else redirect to Login
    } else this.setState({ isPageLoading: false }); // network failure
  };

  deleteProduct = async id => {
    const { products } = this.state;
    this.setState({ deletingCardId: id });
    const params = API.PRODUCT.DELETE;
    params.data = { id };
    const response = await request(params);
    if (response.data) {
      if (response.data.success) {
        const index = products.findIndex(product => product._id === id);
        const newProducts = [...products];
        newProducts.splice(index, 1);
        this.setState({ deletingCardId: "", products: newProducts });
      } else this.setState({ deletingCardId: "" }); // Internal Error
    } else this.setState({ deletingCardId: "" }); // network failure
  };

  addProduct = async product => {
    this.setState({ isProductAdding: true });
    const params = API.PRODUCT.ADD;
    params.data = { ...product };
    const response = await request(params);
    if (response.data && response.data.success) {
      const { products } = this.state;
      const newProducts = [...products];
      newProducts.push(response.data.data);
      this.setState({ products: newProducts });
    } else {
      this.setState({ isProductAdding: false });
    }
    // console.log(product);
  };

  render() {
    const { products, isPageLoading, deletingCardId, isProductAdding } = this.state;
    const { classes } = this.props;
    return isPageLoading ? (
      <Loader />
    ) : (
      <Fragment>
        <Grid component={TransitionGroup} container spacing={24}>
          {products.length > 0 &&
            products.map(item => (
              <CSSTransition
                timeout={300}
                appear
                classNames={{
                  appear: classes.cardAppear,
                  appearActive: classes.cardAppearActive,
                }}
                key={item.id}
              >
                <Grid className={classes.gridItem} item xs>
                  <ProductCard
                    deleteFunc={this.deleteProduct}
                    item={item}
                    deleteProcessing={deletingCardId}
                  />
                </Grid>
              </CSSTransition>
            ))}

          <CSSTransition
            timeout={300}
            appear
            classNames={{
              appear: classes.cardAppear,
              appearActive: classes.cardAppearActive,
            }}
          >
            <Grid className={classes.gridItem} item xs>
              <AddProductCard isProductAdding={isProductAdding} addFunc={this.addProduct} />
            </Grid>
          </CSSTransition>
        </Grid>
      </Fragment>
    );
  }
}

ListProducts.propTypes = {
  classes: PropTypes.object,
};
ListProducts.defaultProps = {
  classes: {},
};

export default withStyles(Styles)(ListProducts);
