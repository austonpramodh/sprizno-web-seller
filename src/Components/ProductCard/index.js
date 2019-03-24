/* eslint-disable no-underscore-dangle */
import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  withStyles,
  CardActions,
  Button,
  Typography,
  GridList,
  GridListTile,
  CircularProgress,
} from "@material-ui/core";
import Styles from "./index.css";
import apiConstants from "../../Utils/Constants/apiConstants";
import API from "../../Utils/Network/api";
import { Consumer } from "../ListProducts";
import request from "../../Utils/Network/request";

const ProductCard = ({ item, classes }) => {
  const [isDeleting, toggleDeleting] = React.useState(false);
  return (
    <Consumer>
      {context => {
        const handleDeleteButton = async () => {
          toggleDeleting(true);
          // call delete api , delete from context
          const params = API.PRODUCT.DELETE;
          params.data = { id: item._id };
          const response = await request(params);
          if (response.success) {
            const {
              contextState,
              contextState: { products },
              changeContextState,
            } = context;
            const index = products.findIndex(product => product._id === item._id);
            const newProducts = [...products];
            newProducts.splice(index, 1);
            changeContextState({ ...contextState, products: newProducts });
            // remove from contex
          } else {
            toggleDeleting(false);
            // error
          }
        };

        const getAvailableStockPercent = () => {
          const { stockSold, stock } = item;
          return Math.floor(((stock - stockSold) / stock) * 100);
        };

        const handleEditButton = () => {};
        return (
          <Card className={classes.card}>
            <div className={classes.cardHeader}>
              <div className={classes.cardHeaderinnerDiv}>
                <Typography variant="headline">{item.name}</Typography>
                <Typography variant="body1" color="textSecondary">
                  {item.category}
                </Typography>
                <CircularProgress
                  size={30}
                  variant="static"
                  value={getAvailableStockPercent()}
                  className={classes.stockCircularBar}
                />
                <div
                  className={classes.stockLeftTextContainer}
                  style={{ fontSize: getAvailableStockPercent() === 100 && "10px" }}
                >
                  {getAvailableStockPercent()}%
                </div>
              </div>
            </div>
            <div className={classes.imageContainer}>
              <GridList className={classes.gridList}>
                {item.imageNames.map(img => (
                  <GridListTile key={img}>
                    <img src={`${apiConstants.URLs.IMAGE_CONTAINER_URL}${img}`} alt={img} />
                  </GridListTile>
                ))}
              </GridList>
            </div>
            {/* <CardContent /> */}
            <CardActions className={classes.cardActions}>
              <div className={classes.descriptionContainer}>
                <b>Description:</b>
                {item.description}
              </div>
              <div className={classes.actionsContainer}>
                <div className={classes.priceContainer}>
                  <Typography>
                    <b>Price: </b>
                    {item.price}
                  </Typography>
                </div>

                <Button onClick={handleEditButton}>Edit</Button>
                <Button onClick={handleDeleteButton}>
                  {isDeleting ? <CircularProgress size={24} /> : "Delete"}
                </Button>
              </div>
            </CardActions>
          </Card>
        );
      }}
    </Consumer>
  );
};

ProductCard.propTypes = {
  item: PropTypes.object,
  classes: PropTypes.object,
};
ProductCard.defaultProps = {
  item: {},
  classes: {},
};

export default withStyles(Styles)(ProductCard);
