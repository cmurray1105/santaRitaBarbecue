import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export default function CheckoutModal(props) {
  const [open, setOpen] = React.useState(false);
  const [neighborhood, handleChange] = React.useState("SRR South");
  const [customerName, handleNameChange] = React.useState("");
  const [streetAddress, handleStreetChange] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());
  const [email, handleEmailChange] = React.useState("");
  const [phone, handlePhoneChange] = React.useState(null);

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("./addOrder", {
        address: streetAddress,
        customerName: customerName,
        deliveryDate: startDate,
        neighborhood: neighborhood,
        cartItems: props.cartItems,
      })
      .then((result) => {
        console.log(result);
        console.log("cart Items", props.cartItems);
        let newQuantities = {}
        for (let item in props.cartItems){
          console.log("ITEMMMM", props.cartItems[item])
          console.log(props.products)
          newQuantities[item] = props.cartItems[item].quantity
        }
        // axios
        //   .post('/changeQuantity', {})

        handleClose()
        props.clearOrder()
      });

  };

  // React.useEffect(() => {
  //   console.log(props);
  // });
  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Delivery Info</h2>
      <h3>Total ${props.total}</h3>
      <div className="order-summary"></div>
      <div className="order-form">
        <form onSubmit={handleSubmit}>
          <label>
            Select Your Neighborhood:
            <br />
            <select
              value={neighborhood}
              onChange={(e) => handleChange(e.target.value)}
            >
              <option value="SRR South">Santa Rita Ranch South</option>
              <option value="SRR North">Santa Rita Ranch North</option>
              <option value="Morningstar">Morningstar</option>
            </select>
          </label>
          <br />
          <label>
            Name:
            <br />
            <input
              type="text"
              value={customerName}
              onChange={(e) => handleNameChange(e.target.value)}
            />
          </label>
          <br />
          <label>
            Street Address:
            <br />
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => handleStreetChange(e.target.value)}
            />
          </label>
          <br />
          <label>
            Email Address:
            <br />
            <input
              type="text"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
            />
          </label>
          <br />
          <label>
            Phone:
            <br />
            <input
              type="text"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
            />
          </label>
          <br />
          <label>
            Delivery Date
            <br />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            {/* <br/> */}
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
  console.log(new Date().toISOString().slice(0, 19).replace("T", " "));
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
}
