/* eslint-disable no-underscore-dangle */
import React from "react";
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

const listProductsContext = React.createContext();
export const { Consumer } = listProductsContext;

const ListProducts = ({ classes }) => {
  const [state, setState] = React.useState({
    products: [],
    isPageLoading: true,
  });

  const { products, isPageLoading } = state;

  const getAllProducts = async () => {
    const params = API.PRODUCT.GET_ALL;
    const response = await request(params);
    if (response.data) {
      if (response.success) {
        setState({ ...state, products: response.data, isPageLoading: false });
      } // else redirect to Login
    } else setState({ ...state, isPageLoading: false }); // network failure
  };
  React.useEffect(() => {
    getAllProducts();
  }, []);

  const { Provider } = listProductsContext;

  return isPageLoading ? (
    <Loader />
  ) : (
    <Provider value={{ contextState: state, changeContextState: setState }}>
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
              key={item._id}
            >
              <Grid className={classes.gridItem} item xs>
                <ProductCard item={item} />
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
            <AddProductCard />
          </Grid>
        </CSSTransition>
      </Grid>
    </Provider>
  );
};

ListProducts.propTypes = {
  classes: PropTypes.object,
};
ListProducts.defaultProps = {
  classes: {},
};

const StyledListProducts = withStyles(Styles)(ListProducts);
StyledListProducts.meta = { id: idConstants.LIST_PRODUCTS };

export default StyledListProducts;
