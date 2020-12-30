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



  createData(name, neighborhood, address, email, phone, deliveryDate, total, products) {
    return {
      name,
      neighborhood,
      address,
      email,
      phone,
      deliveryDate,
      total,
      products,
    };
  }

    fillRows() {
  const rows = []
    for (let product in this.state.orders){
      console.log("PRODUCT", product, "STATE ORDERS", this.state.orders)
      let total = 0;
      for (let i = 0; i < this.state.orders[product].products.length; i++){
        total+= (this.state.orders[product].products[i].price * this.state.orders[product].products[i].quantity)

    }
    let priceString = total.toString()
      console.log(priceString.length)
      if (priceString.includes('.')){
      if(priceString.split('.')[1].length ===1){
        priceString += '0'
      }
      if(priceString.split('.')[1].length > 2){
        priceString = priceString.split('.')[0] + '.' + priceString.split('.')[1].slice(0,2)
      }

    } else{
        priceString+='.00'
      }
      console.log("TOTAL BEFORE PUSHING",  priceString)
    rows.push(this.createData(this.state.orders[product].customer, this.state.orders[product].neighborhood, this.state.orders[product].address, this.state.orders[product].email, this.state.orders[product].phone, this.state.orders[product].deliveryDate, `$${priceString}`, this.state.orders[product].products)
    )
    }
    console.log("America", rows)
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
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Delivery Date </TableCell>
              <TableCell align="right">Total</TableCell>
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