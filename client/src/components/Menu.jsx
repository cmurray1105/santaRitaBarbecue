import {Tabs, Tab} from 'react-bootstrap-tabs';
import React from 'react'
import Meats from './Meats'
import Sides from './Sides'
import Combos from './Combos'
function Menu(props) {
  const [key, setKey] = React.useState('meats');

  return (
<Tabs className="tab-content" onSelect={(index, label) => props.getProducts(label)}>
  <Tab className="menuTab" eventKey="meats" title="Meats" label="Meats">
    <Meats meats={props.products} loaded={props.loaded}/>
  </Tab>
  <Tab className="menuTab" eventKey="Sides" title="Sides" label="Sides">
    <Sides sides={props.products} loaded={props.loaded}/>
  </Tab>
  <Tab className="menuTab" eventKey="Combos" title="Combos" label="Combos">
    <Combos />
  </Tab>
  <Tab className="menuTab" eventKey="Dessert" title="Dessert" label="Dessert">
    <Combos />
  </Tab>
  <Tab className="menuTab" eventKey="Catering" title="Catering" label="Catering">
    <Combos />
  </Tab>
  <Tab className="menuTab" eventKey="Gift Shop" title="Gift Shop" label="Gift Shop">
    <Combos />
  </Tab>
</Tabs>
  );
}

export default Menu;