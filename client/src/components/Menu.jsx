// import { Tabs, Tab } from "react-bootstrap-tabs";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import a11yProps from "./a11yProps";

import Products from "./Products";
import TabPanel from "./TabPanel";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));
function Menu(props) {
  const [key, setKey] = React.useState("meats");
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.getProducts(categories[newValue])
    // console.log("newValue", value);
    // // setKey(event.target.value);
    // console.log("value", event)
  };

  const categories = ['Meats', 'Sides', 'Combos', 'Dessert', 'Catering', 'Gift Shop']
  return (
    // < className="root">
    <div>
      <AppBar position="static" color="default">
        <Tabs
          className="tab-content"
          value={value}
          // indicatorColor="primary"
          // textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          // aria-label="scrollable auto tabs example"
          onChange={handleChange}

        >
          <Tab className="menuTab" label="Meats">
            {/* <Products
              addToCart={props.addToCart}
              products={props.products}
              loaded={props.loaded}

            /> */}
          </Tab>
          <Tab
            className="menuTab"
            label="Sides"
          >
          </Tab>
          <Tab
            className="menuTab"
            label="Combos"
          >

          </Tab>
          <Tab
            className="menuTab"
            eventKey="Dessert"
            title="Dessert"
            label="Dessert"
          >

          </Tab>
          <Tab
            className="menuTab"
            eventKey="Catering"
            title="Catering"
            label="Catering"
            // {...a11yProps(4)}
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
            // {...a11yProps(5)}
          >
             <Products
              addToCart={props.addToCart}
              products={props.products}
              loaded={props.loaded}
            />
          </Tab>
        </Tabs>
      </AppBar>
      <Products
              addToCart={props.addToCart}
              products={props.products}
              loaded={props.loaded}
            />

      {/* <TabPanel value={value} index={0}>
        <Products
          addToCart={props.addToCart}
          products={props.products}
          loaded={props.loaded}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Products
          addToCart={props.addToCart}
          products={props.products}
          loaded={props.loaded}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Products
          addToCart={props.addToCart}
          products={props.products}
          loaded={props.loaded}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Products
          addToCart={props.addToCart}
          products={props.products}
          loaded={props.loaded}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Products
          addToCart={props.addToCart}
          products={props.products}
          loaded={props.loaded}
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
        <Products
          addToCart={props.addToCart}
          products={props.products}
          loaded={props.loaded}
        />
      </TabPanel> */}
    </div>
  );
}

export default Menu;
