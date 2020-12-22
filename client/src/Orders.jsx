import React from "react";
import Axios from "axios";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Row from './components/Row'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});
class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rows: [], orders: {}, loaded: false };
    this.createData=this.createData.bind(this);
    this.fillRows = this.fillRows.bind(this);
    this.getOrders = this.getOrders.bind(this);
  }
  componentDidMount() {
    this.getOrders();

  }
  getOrders() {
    Axios.get("/getOrders")
      .then((result) => {
        console.log("getOrders",result.data);
        this.setState({orders: result.data, loaded: true})
        console.log("!!!!",  this.state.orders)
        for (let order in this.state.orders){
          let total = 0;
          for (let i = 0; i < this.state.orders[order].products.length; i++){
            total += this.state.orders[order].products[i].price
          } console.log("TOTAL!!", total)
        }
      })
      .then((result)=>{
        this.fillRows()
      })
      .catch((err) => {
        console.log(err);
      });
  }



  createData(name, neighborhood, address, deliveryDate, protein, price, products) {
    return {
      name,
      neighborhood,
      address,
      deliveryDate,
      protein,
      price,
      products,
    };
  }

    fillRows() {
  const rows = []
    for (let product in this.state.orders){
      console.log("PRODUCTTTTT", product, "STATE ORDERS", this.state.orders)
    rows.push(this.createData(this.state.orders[product].customer, this.state.orders[product].neighborhood, this.state.orders[product].address, this.state.orders[product].deliveryDate, 1,1, this.state.orders[product].products)
    )
    }
    this.setState({rows: rows})
  }
  render(){
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell> Customer Name</TableCell>
              <TableCell align="right">Neighborhood</TableCell>
              <TableCell align="right">Address
              </TableCell>
              <TableCell align="right">Delivery Date </TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
  export default Orders;