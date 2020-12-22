import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

export default function BrisketModal(props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  // const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [quantity, handleChange] = React.useState("0");
  const [customerName, handleNameChange] = React.useState('');
  // const [value, handleChange] = React.useState('');


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.addToCart({productName: props.product.product_name, quantity: parseInt(quantity), price: props.product.price, id: props.product.id})
    handleClose()
  }

  const body = (
    <div className="paper">
      <h2 id="simple-modal-title">{props.product.product_name}</h2>
      <div className="order-form">
      <form onSubmit={handleSubmit}>

      <label>
          Quantity:
          <select onChange={e => handleChange(e.target.value)}>>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <input  type="submit" value="Add to Cart" />
      </form>
      </div>
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Order
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};