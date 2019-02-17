import React, { Component, Fragment } from "react";
import { MoveToInbox as InboxIcon } from "@material-ui/icons";
import Axios from "axios";
import { TableHead, TableCell, TableRow, Table, TableBody } from "@material-ui/core";
import nameConstants from "../../Utils/Constants/nameConstants";
import API from "../../Utils/Network/api";
import Loader from "../Loader";

export default class ListProducts extends Component {
  static meta = { name: nameConstants.LIST_PRODUCTS, icon: InboxIcon };

  state = {
    products: [],
    isLoading: true,
  };

  componentDidMount() {
    // request APi and get data
    this.getAllProducts();
  }

  getAllProducts = async () => {
    const { isLoading } = this.state;
    if (!isLoading) {
      this.setState({ isLoading: true });
    }
    const ProductsAPI = await API.PRODUCT();
    Axios({ ...ProductsAPI.GET_ALL })
      .then(res => {
        this.setState({ products: res.data.data, isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { products, isLoading } = this.state;
    const deleteProduct = async id => {
      this.setState({ isLoading: true });
      const ProductAPI = await API.PRODUCT();
      const params = ProductAPI.DELETE;
      params.data = { id };
      Axios({ ...params })
        .then(() => {
          this.getAllProducts();
        })
        .catch();
    };
    return isLoading ? (
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
