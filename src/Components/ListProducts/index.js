import React, { Component, Fragment } from "react";
import { MoveToInbox as InboxIcon } from "@material-ui/icons";
import { TableHead, TableCell, TableRow, Table, TableBody } from "@material-ui/core";
import nameConstants from "../../Utils/Constants/nameConstants";
import API from "../../Utils/Network/api";
import Loader from "../Loader";
import request from "../../Utils/Network/request";

export default class ListProducts extends Component {
  static meta = { name: nameConstants.LIST_PRODUCTS, icon: InboxIcon };

  state = {
    products: [],
    isPageLoading: true,
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

  render() {
    const { products, isPageLoading } = this.state;
    const deleteProduct = async id => {
      this.setState({ isPageLoading: true });
      const params = API.PRODUCT.DELETE;
      params.data = { id };
      const response = await request(params);
      if (response.data) {
        if (response.data.success) {
          this.getAllProducts();
        } else this.setState({ isPageLoading: false }); // Internal Error
      } else this.setState({ isPageLoading: false }); // network failure
    };
    return isPageLoading ? (
      <Loader />
    ) : (
      <Fragment>
        {products.length > 0 ? (
          <Fragment>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  // eslint-disable-next-line no-underscore-dangle
                  <TableRow key={product._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell component="th" scope="row">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>
                      <button
                        type="button"
                        onClick={() => {
                          // eslint-disable-next-line no-underscore-dangle
                          deleteProduct(product._id);
                        }}
                      >
                        delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Fragment>
        ) : (
          "NOthing to show"
        )}
      </Fragment>
    );
  }
}
