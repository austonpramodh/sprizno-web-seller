/* eslint-disable no-underscore-dangle */
import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  withStyles,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography,
  GridList,
  GridListTile,
} from "@material-ui/core";
import Styles from "./index.css";
import apiConstants from "../../Utils/Constants/apiConstants";

// eslint-disable-next-line react/prefer-stateless-function
class ProductCard extends React.Component {
  handleDeleteButton = () => {
    const { deleteFunc, item } = this.props;
    deleteFunc(item.id);
  };

  render() {
    const { item, classes, deleteProcessing } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader title={item.name} subheader="September 14, 2016" />
        {/* <CardMedia
          className={classes.media}
          image={
            item.imageNames
              ? `${apiConstants.URLs.IMAGE_CONTAINER_URL}${item.imageNames[0]}`
              : "https://spriznostorage.blob.core.windows.net/sprizno1/aCi8Wt0HhyE.jpg"
          }
          title="aCi8Wt0HhyE"
        /> */}
        <div className={classes.imageContainer}>
          <GridList className={classes.gridList}>
            {item.imageNames.map(img => (
              <GridListTile key={img}>
                <img src={`${apiConstants.URLs.IMAGE_CONTAINER_URL}${img}`} alt={img} />
              </GridListTile>
              // <div>{img}</div>
            ))}
          </GridList>
        </div>
        <CardContent>
          <Typography variant="subtitle1">{item.shortDescription}</Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <div className={classes.priceContainer}>
            <Typography>
              <b>Price: </b>
              {item.price}
            </Typography>
          </div>
          <Button onClick={this.handleDeleteButton}>
            {deleteProcessing === item.id ? "Loading" : "Delete"}
          </Button>
        </CardActions>
        <div>
          <b>Description:</b>
          {item.description}
        </div>
      </Card>
    );
  }
}

ProductCard.propTypes = {
  item: PropTypes.object,
  classes: PropTypes.object,
  deleteFunc: PropTypes.func,
  deleteProcessing: PropTypes.string,
};
ProductCard.defaultProps = {
  item: {},
  classes: {},
  deleteFunc: () => {},
  deleteProcessing: "",
};

export default withStyles(Styles)(ProductCard);
