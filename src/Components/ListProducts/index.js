import React, { Component, Fragment } from "react";
import { MoveToInbox as InboxIcon } from "@material-ui/icons";
import Axios from "axios";
import nameConstants from "../../Utils/Constants/nameConstants";
import API from "../../Utils/Network/api";

export default class ListProducts extends Component {
  static meta = { name: nameConstants.LIST_PRODUCTS, icon: InboxIcon };

  state = {
    products: [],
  };

  componentDidMount() {
    // request APi and get data
    this.getAllProducts();
  }

  getAllProducts = async () => {
    const ProductsAPI = await API.PRODUCT();
    Axios({ ...ProductsAPI.GET_ALL })
      .then(res => {
        this.setState({ products: res.data.data });
      })
      .catch(() => {});
  };

  render() {
    const { products } = this.state;
    const deleteProduct = async id => {
      const ProductAPI = await API.PRODUCT();
      const params = ProductAPI.DELETE;
      params.data = { id };
      Axios({ ...params })
        .then(() => {
          this.getAllProducts();
        })
        .catch();
    };
    return (
      <Fragment>
        {products.length > 0
          ? products.map(product => (
              // eslint-disable-next-line no-underscore-dangle
              <Fragment key={product._id}>
                <div>name : {product.name}</div>
                <div>Price: {product.price}</div>
                <div>Description: {product.description}</div>
                <button
                  type="button"
                  onClick={() => {
                    // eslint-disable-next-line no-underscore-dangle
                    deleteProduct(product._id);
                  }}
                >
                  delete
                </button>
                <br />
                <br />
              </Fragment>
            ))
          : "NOthing to show"}
      </Fragment>
    );
  }
}
