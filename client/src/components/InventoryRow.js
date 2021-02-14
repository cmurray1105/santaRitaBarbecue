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
import axios from 'axios';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  button: {
    background: 'red',
    color: 'white',
    cursor: 'pointer',
    fontWeight : 'bold',
    outline: 'none',
    // border: border,
    borderRadius: 2,
    // borderColor: textColor,
    // border: border,
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px  grey',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    bottom: 0
  },
  hovered: {
    background: 'white',
    color: 'red',
    cursor: 'pointer',
    fontWeight : 'bold',
    outline: 'none',
    // border: border,
    borderRadius: 2,
    // borderColor: textColor,
    // border: border,
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px  grey',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    bottom: 0
  }
});

function InventoryRow(props) {
  const [hovered, setHovered] = React.useState(false)
  const row = props.row
  console.log("ROW", row)
  const classes = useRowStyles();
  const deleteItem = (id)=>{
    axios.delete('/inventory', { data: {id: id}})
    .then((result=>{
      console.log("INV DELETE", result)
      props.getInventory()
    }
    ))
  }
  return (
<>
<TableRow className={classes.root}>
<TableCell align="right" component="th" scope="row">{row.product_name}</TableCell>
<TableCell align="right">{row.quantity}</TableCell>
<TableCell align="right">${props.convertPriceToString(row.price)}</TableCell>
<TableCell align="right">{row.category}</TableCell>
<button
onMouseEnter={()=>{setHovered(true)}}
onMouseLeave={()=>{setHovered(false)}}
className={hovered ? classes.hovered : classes.button}
onClick={()=>{
  console.log("ROW ROW ROW", row.id)
  deleteItem(row.id)}}>DELETE</button>
</TableRow>
</>
  )
}
export default InventoryRow;