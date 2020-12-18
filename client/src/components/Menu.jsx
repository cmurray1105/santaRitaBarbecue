import {Tabs, Tab} from 'react-bootstrap-tabs';
import React from 'react'
import Meats from './Meats'
import Sides from './Sides'
import Combos from './Combos'
function Menu(props) {
  const [key, setKey] = React.useState('meats');

  return (
<Tabs className="menuTabs" onSelect={(index, label) => props.getProducts(label)}>
  <Tab className="menuTab" eventKey="meats" title="Meats" label="Meats">
    <Meats meats={props.products} loaded={props.loaded}/>
  </Tab>
  <Tab className="menuTab" eventKey="Sides" title="Sides" label="Sides">
    <Sides sides={props.products} loaded={props.loaded}/>
  </Tab>
  <Tab className="menuTab" eventKey="Combos" title="Combos" label="Combos">
    <Combos />
  </Tab>
</Tabs>
  );
}

export default Menu;