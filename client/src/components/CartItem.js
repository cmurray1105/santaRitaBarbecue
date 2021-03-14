import React from "react";
import { Card, CardContent, CardMedia, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    height: "64px",
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr",
    gridTemplateRows: "1fr",
    gridTemplateAreas: "'image product quantity'",
  },
  media: {
    height: "64px",
    borderRadius: "15%",
    gridArea: "image",
  },
  wrapper: {
    // display: 'inline-flex',
    // alignItems: 'flex-start'
  },
  text: {
    marginLeft: "25px",
    verticalAlign: "middle",
    margin: "auto",
    gridArea: "product",
  },
  quantButton: {
    marginTop: "20px",
    marginLeft: "20px",
    gridArea: "quantity",
    verticalAlign: "middle",
    float: "right",
  },
  quantString: {
    marginLeft: "5px",
    marginRight: "5px",
  },
});
const CartItem = (props) => {
  const classes = useStyles();

  console.log("CART ITEM ITEM", props.item);
  let currentProduct;
  for (let i = 0; i < props.products.length; i++) {
    // console.log("product man", product)
    if (props.products[i].id === props.item.id) {
      currentProduct = props.products[i];
    }
  }
  const handleDecrease = () => {
    props.decreaseQuantity(props.item.productInfo.product_name);
  };
  const handleIncrease = () => {
    props.increaseQuantity(props.item.productInfo.product_name);
  };
  return (
    <div className={classes.root}>
      <img className={classes.media} src={props.item.productInfo.image_url} />
      <h4 className={classes.text}>
        {props.item.productInfo.product_name} $
        {props.convertPriceToString(
          props.item.quantity * props.item.productInfo.price
        )}
      </h4>
      <div className={classes.quantButton}>
        <button className="value-button" id="decrease" onClick={handleDecrease}>
          -
        </button>
        <span className={classes.quantString}>{props.item.quantity}</span>
        <button
          className="value-button"
          id="increase"
          onClick={handleIncrease}
          value="Increase Value"
        >
          +
        </button>
      </div>
    </div>
  );
};
export default CartItem;
