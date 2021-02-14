import { makeStyles } from "@material-ui/core/styles";
// import Popper from '@material-ui/core/popper';
import React, { ReactElement } from "react";
import TableChartIcon from "@material-ui/icons/TableChart";
import { ClickAwayListener } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import "./styles.css";
import CartPopper from "./CartPopper";
import CheckoutModal from "./CheckoutModal";
import CartItem from "./CartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
function Navbar(props) {
  const [open, setOpen] = React.useState(false);
  const [height, setHeight] = React.useState("400px");
  const [anchorEl, handleAnchor] = React.useState(null);
  const [arrowRef, handleArrowRef] = React.useState(null);
  const useStyles = makeStyles((theme) => ({
    paper: {
      border: "none",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
      zIndex: 3,
      height: "max-content",
      minHeight: "400px",
      width: "500px",
      borderRadius: "6px",
      margin: "auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "4fr 1fr",
      gridTemplateAreas: " 'side list side'  'side checkout side",
      // alignItems: 'center'
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      textAlign: "center",
      marginLeft: "85%",
    },
    button: {
      height: "38px",
      width: "38px",
      background: "white",
      border: "none",
      color: "red",
      cursor: "pointer",
      textAlign: "center",
      display: "inline-block",
      outline: "none",
    },
    cartContainer: {
      gridArea: "list",
    },
    checkoutArea: {
      gridArea: "checkout",
    },
    total: {
      height: "64px",
    },
    totalText: {
      marginLeft: '40%',
      // marginTop: '10%',
      // transform: 'translate(50%, 50%)'
    },
    emptyCart: {
      // position: 'absolute',
      // marginTop: '50%',
      // marginLeft: '40%',
      alignItems: 'center'
    }
  }));
  const classes = useStyles();

  const node = React.useRef();
  console.log("nodey node:", node);

  const handleClick = (event) => {
    handleAnchor(anchorEl ? null : event.currentTarget);
    console.log("ANCHORS AWAY!", anchorEl);
    setOpen(!open);
  };
  let items = [];
  for (let order in props.cartItems) {
    items.push(props.cartItems[order]);
  }

  // if (Object.keys(props.cartItems).length > 4){
  //   let itemsOverFour = Object.keys(props.cartItems).length - 4
  //   let newHeight = (400 + 64 * itemsOverFour).toString()+'px'
  //   setHeight(newHeight)
  // }
  let total = 0;
  for (let item in props.cartItems){
    // console.log("WHAT AN ITEM LOOKS LIKE",
    total = total + ((props.cartItems[item].price) * props.cartItems[item].quantity)
  }
  const handleClickAway = (event) => {
    if (open){
    handleAnchor(null)
    setOpen(false);
    }
  };

  return (
    <ClickAwayListener

    onClickAway={handleClickAway}>
    <div>
      <div className={classes.buttonContainer}>
        <button className={classes.button} onClick={handleClick}>
          <FontAwesomeIcon icon={faShoppingCart} size="2x" />
          <span>{props.quantity}</span>
        </button>
      </div>
      <CartPopper
        ref={node}
        placement="top"
        open={open}
        anchorEl={anchorEl}
        modifiers={{
          flip: {
            enabled: true,
          },
          arrow: {
            enabled: true,
            element: arrowRef,
          },
          preventOverflow: {
            enabled: "true",
            boundariesElement: "scrollParent",
          },
        }}
      >
        {true && <span className="arrow" ref={handleArrowRef} />}
        <div className={classes.paper}>
          <div className="cartContainer">
            {/* MAP CART ITEMS OR DISPLAY EMPTY CART */}

            {props.quantity > 0 ? items.map((item) => (
              <>
                <CartItem
                  increaseQuantity={props.increaseQuantity}
                  decreaseQuantity={props.decreaseQuantity}
                  products={props.products}
                  item={item}
                  convertPriceToString={props.convertPriceToString}
                />
                <hr />
              </>
            )):

            <div>
            <FontAwesomeIcon className={classes.emptyCart} icon={faShoppingCart} size="5x" />
            <h1 className={classes.emptyCart}>Your Cart Is Empty</h1>
            </div>
            }
          </div>

          <div className="checkoutArea">
            {/* IF CART IS NOT EMPTY RENDER CHECKOUTMODAL BUTTON*/}
            {props.quantity > 0 ? (
              <>
                <div className={classes.total}>
                  <hr />
                  <h2 className={classes.totalText}>${props.convertPriceToString(total)}</h2>
                  {/* <hr /> */}
                </div>
                <CheckoutModal
                  clearOrder={props.clearOrder}
                  total={total}
                  products={props.products}
                  cartItems={props.cartItems}
                />
              </>
            ) : null
}
          </div>
        </div>
      </CartPopper>
    </div>
    </ClickAwayListener>
  );
}
export default Navbar;
