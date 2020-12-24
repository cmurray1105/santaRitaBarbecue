import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CheckoutModal from './CheckoutModal.jsx'

const Cart = (props) =>{
  return(
  <div>
  <CheckoutModal clearOrder={props.clearOrder} total={props.total} products={props.products} cartItems={props.cartItems}/>
  Total Due:
  ${props.total}
  </div>

  )
}
export default Cart;