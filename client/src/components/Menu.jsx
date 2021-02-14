// import { Tabs, Tab } from "react-bootstrap-tabs";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
// import AppBar from "@material-ui/core/AppBar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Products from "./Products";
import CheckoutModal from "./CheckoutModal";

function Menu(props) {
  const matches = useMediaQuery("(min-width:800px)");
  const [value, setValue] = React.useState(0);
  const [hovered, setHovered] = React.useState(null);
  const useStyles = makeStyles((theme) => ({
    paper: {
      justifyContent: "center",
      color: "red",
      backgroundColor: "white",
    },
    hovered: {
      color: "white",
      backgroundColor: "red",
    },
    scroller: {
      flexGrow: "0",
    },
  }));

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.getProducts(props.categories[newValue]);
  };
  const handleHover = (cat) => {
    console.log("CATEGORY", cat);
    setHovered(cat);
  };
  const handleExit = () => {
    setHovered("");
  };

  const classes = useStyles();

  let mapTabs = props.categories.map((category) => {
    console.log(category);
    return (
      <Tab
        onMouseEnter={() => {
          handleHover(category);
        }}
        onMouseLeave={() => {
          handleExit();
        }}
        className={hovered === category ? classes.hovered : classes.paper}
        label={category}
      ></Tab>
    );
  });

  return (
    <div>
      <Tabs
        classes={{ root: classes.paper, scroller: classes.scroller }}
        value={value}
        variant={"scrollable"}
        scrollButtons="auto"
        onChange={handleChange}
        centered
      >
        {mapTabs}
      </Tabs>
      <Products
        convertPriceToString={props.convertPriceToString}
        addToCart={props.addToCart}
        products={props.products}
        loaded={props.loaded}
        cartItems={props.cartItems}
      />
    </div>
  );
}

export default Menu;
