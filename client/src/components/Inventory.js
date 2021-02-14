import React from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InventoryRow from './InventoryRow'
import AddInventory from './AddInventory'
const Inventory = (props) =>{
const [inventory, setInventory] = React.useState([])

console.log("INV PROPS", props)
React.useEffect(() => {
  // Update the document title using the browser API
  getInventory()
}, []);

const getInventory = () =>{
  axios.get('/inventory')
  .then((result) => {
    setInventory(result.data)
    console.log("INV", result.data)
  })



}
return(
<div>
<div className={'header'}>

</div>
<div>
<TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right"> Product </TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price
              </TableCell>
              <TableCell align="right">Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((row) => (
              <InventoryRow row={row} getInventory={getInventory} convertPriceToString={props.convertPriceToString}/>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
</div>
<AddInventory
          // singleFileUploadHandler={props.singleFileUploadHandler}
          // singleFileChangedHandler={props.singleFileChangedHandler}
          // setSelectedFile={props.setSelectedFile}
          // selectedFile={props.selectedFile}
          getInventory={getInventory}
          getCategories={props.getCategories}
          categories={props.categories}/>

</div>
)
}
export default Inventory;