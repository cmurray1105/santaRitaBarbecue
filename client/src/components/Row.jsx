import React from 'react';
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
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  row.products = row.products || []
  console.log("ROW!!!!!!!", row)
  let rowSplit = row.deliveryDate.split('-')
  let year = rowSplit[0];
  let day = rowSplit[2].slice(0,2);
  let month = rowSplit[1];
  let date = `${month}/${day}/${year}`
  return (
    <React.Fragment>

      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.neighborhood}</TableCell>
        <TableCell align="right">{row.address}</TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.phone}</TableCell>
        <TableCell align="right">{date}</TableCell>
        <TableCell align="right">{row.total}</TableCell>
        <button>
        order fulfilled
      </button>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Order Summary
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                  <TableCell align="right">Quantity</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((productRow) => {
                    console.log("proRo", productRow)
                    return(
                    <TableRow key={productRow.productName}>
                    <TableCell align="right">{productRow.quantity}</TableCell>
                      <TableCell component="th" scope="row">
                        {productRow.productName}
                      </TableCell>
                      <TableCell>{productRow.price}</TableCell>
                    </TableRow>

                  )}
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

    </React.Fragment>
  );
}
export default Row;