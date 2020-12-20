import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function CheckoutModal(props) {
  const [open, setOpen] = React.useState(false);
  const [neighborhood, handleChange] = React.useState("SRR South");
  const [customerName, handleNameChange] = React.useState('');
  const [streetAddress, handleStreetChange] = React.useState('');
  const [startDate, setStartDate] = React.useState(new Date());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Neighborhood:", neighborhood, "Customer Name", customerName)
  }

  React.useEffect(() => {

  })
  const body = (
    <div className="paper">
      <h2 id="simple-modal-title">Delivery Info</h2>
      <h3>Total {props.total}</h3>
      <div className="order-summary"></div>
      <div className="order-form">
      <form onSubmit={handleSubmit}>

        <label>
          Select Your Neighborhood:
          <select value={neighborhood} onChange={e => handleChange(e.target.value)}>
            <option value="SRR South">Santa Rita Ranch South</option>
            <option value="SRR North">Santa Rita Ranch North</option>
            <option value="Morningstar">Morningstar</option>
          </select>
        </label>
        <label>
          Name:
          <input type="text" value={customerName} onChange={e => handleNameChange(e.target.value)} />
        </label>
        <label>
          Street Address:
          <input type="text" value={streetAddress} onChange={e => handleStreetChange(e.target.value)} />
        </label>
        <label>Delivery Date
    <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
    </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    </div>
  );
  console.log(new Date().toISOString().slice(0, 19).replace('T', ' '))
  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Checkout
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