import { Tabs, Tab } from "react-bootstrap-tabs";
import React from "react";
import Products from "./Products";
function Menu(props) {
  const [key, setKey] = React.useState("meats");

  return (
    <Tabs
      className="tab-content"
      onSelect={(index, label) => props.getProducts(label)}
    >
      <Tab className="menuTab" eventKey="meats" title="Meats" label="Meats">
        <Products
          addToCart={props.addToCart}
          products={props.products}
          loaded={props.loaded}
        />
      </Tab>
      <Tab className="menuTab" eventKey="Sides" title="Sides" label="Sides">
        <Products
          addToCart={props.addToCart}
          products={props.products}
          loaded={props.loaded}
        />
      </Tab>
      <Tab className="menuTab" eventKey="Combos" title="Combos" label="Combos">
        <Products
          addToCart={props.addToCart}
          products={props.products}
          loaded={props.loaded}
        />
      </Tab>
      <Tab
        className="menuTab"
        eventKey="Dessert"
        title="Dessert"
        label="Dessert"
      >
        <Products
          addToCart={props.addToCart}
          products={props.products}
          loaded={props.loaded}
        />
      </Tab>
      <Tab
        className="menuTab"
        eventKey="Catering"
        title="Catering"
        label="Catering"
      >
        <Products
          addToCart={props.addToCart}
          products={props.products}
          loaded={props.loaded}
        />
      </Tab>
      <Tab
        className="menuTab"
        eventKey="Gift Shop"
        title="Gift Shop"
        label="Gift Shop"
      >
        <Products
          addToCart={props.addToCart}
          products={props.products}
          loaded={props.loaded}
        />
      </Tab>
    </Tabs>
  );
}

export default Menu;
