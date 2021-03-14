import React from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Row from "./Row";

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rows: [], orders: {}, loaded: false };
    this.createData = this.createData.bind(this);
    this.fillRows = this.fillRows.bind(this);
    this.getOrders = this.getOrders.bind(this);
  }
  componentDidMount() {
    this.getOrders();
  }
  getOrders() {
    Axios.get("/getOrders")
      .then((result) => {
        this.setState({ orders: result.data, loaded: true });
        for (let order in this.state.orders) {
          let total = 0;
          for (let i = 0; i < this.state.orders[order].products.length; i++) {
            total += this.state.orders[order].products[i].price;
          }
        }
      })
      .then((result) => {
        this.fillRows();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getCategories = () => {
    Axios.get("/categories").then((result) => {
      let cats = [];
      for (let i = 0; i < result.data.length; i++) {
        cats.push(result.data[i].name);
      }
      this.setState({ categories: cats });
    });
  };

  createData(
    name,
    neighborhood,
    address,
    email,
    phone,
    deliveryDate,
    total,
    products
  ) {
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
    const rows = [];
    for (let product in this.state.orders) {
      let total = 0;
      for (let i = 0; i < this.state.orders[product].products.length; i++) {
        total +=
          this.state.orders[product].products[i].price *
          this.state.orders[product].products[i].quantity;
      }
      let priceString = total.toString();
      if (priceString.includes(".")) {
        if (priceString.split(".")[1].length === 1) {
          priceString += "0";
        }
        if (priceString.split(".")[1].length > 2) {
          priceString =
            priceString.split(".")[0] +
            "." +
            priceString.split(".")[1].slice(0, 2);
        }
      } else {
        priceString += ".00";
      }
      rows.push(
        this.createData(
          this.state.orders[product].customer,
          this.state.orders[product].neighborhood,
          this.state.orders[product].address,
          this.state.orders[product].email,
          this.state.orders[product].phone,
          this.state.orders[product].deliveryDate,
          `$${priceString}`,
          this.state.orders[product].products
        )
      );
    }
    this.setState({ rows: rows });
  }
  render() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell> Customer Name</TableCell>
              <TableCell align="right">Neighborhood</TableCell>
              <TableCell align="right">Address</TableCell>
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
