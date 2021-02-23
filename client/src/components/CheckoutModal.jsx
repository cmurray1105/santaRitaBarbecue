import React from "react";
import Button from '@material-ui/core/Button';
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import * as emailjs from 'emailjs-com'
// import DayPicker from 'react-day-picker';
// import DayPickerInput from 'react-day-picker/DayPickerInput';
// import 'react-day-picker/lib/style.css';


emailjs.init("user_975JwJzPB6r4yxiDzOfHn");

export default function CheckoutModal(props) {

  const [open, setOpen] = React.useState(false);
  const [neighborhood, handleChange] = React.useState("Santa Rita Ranch South");
  const [customerName, handleNameChange] = React.useState("");
  const [streetAddress, handleStreetChange] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());
  const [email, handleEmailChange] = React.useState("");
  const [phone, handlePhoneChange] = React.useState(null);
  const [background, setBackground]= React.useState('red');
  const [textColor, setTextColor] = React.useState('white')
  const [border, setBorder] = React.useState('none')
  const [subBackground, setSubBackground]= React.useState('red');
  const [subText, setSubTextColor] = React.useState('white')
  const [subBorder, setSubBorder] = React.useState('none')

  const handleEnter = ()=>{
    setBackground('white')
    setTextColor('red')
    setBorder('0')

  }
  const handleExit = ()=>{
    setBackground('red')
    setTextColor('white')
    setBorder('none')
  }
  const handleSubEnter = ()=>{
    setSubBackground('white')
    setSubTextColor('red')
    setSubBorder('0')

  }
  const handleSubExit = ()=>{
    setSubBackground('red')
    setSubTextColor('white')
    setSubBorder('none')
  }


  console.log("props", props)
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      maxHeight: 800,
      backgroundColor: theme.palette.background.paper,
      border: 'none',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      outline: 'none',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '5%'
    },
    button: {
      background: background,
      color: textColor,
      cursor: 'pointer',
      fontWeight : 'bold',
      outline: 'none',
      // border: border,
      borderRadius: 2,
      // borderColor: textColor,
      border: border,
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px  grey',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      bottom: 0
    },
    submitButton: {
      background: subBackground,
      color: subText,
      cursor: 'pointer',
      fontWeight : 'bold',
      outline: 'none',
      // border: border,
      borderRadius: 2,
      // borderColor: textColor,
      border: subBorder,
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px  grey',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      bottom: 0
    }
  }));

  // const theme = createMuiTheme({
  //   overrides: {
  //     // Style sheet name ⚛️
  //     MuiButton: {
  //       // Name of the rule
  //       text: {
  //         // Some CSS
          // background: background,
          // // fontWeight : 'bold',
          // borderRadius: 3,
          // border: 0,
          // color: textColor,
          // height: 48,
          // padding: '0 30px',
          // boxShadow: '0 3px 5px 2px  grey',
          // display: 'block',
          // marginLeft: 'auto',
          // marginRight: 'auto',
          // bottom: 0

  //       },

  //     },
  //   },
  // });


  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("SUBMIT BEING HANDLED AND STUFF")
    if (streetAddress.length>0 && customerName.length > 0 && email.length > 0 && phone.length > 0){
    axios
.post("/addOrder", {
        address: streetAddress,
        customerName: customerName,
        deliveryDate: startDate,
        neighborhood: neighborhood,
        cartItems: props.cartItems,
        email: email,
        phone: phone
      })

      .then((result) => {
        let generateItemList = ()=> {
          let productString= ''
          let products = []
          for (let item in props.cartItems){
            products.push(item)
          }
          for (let i = 0; i < products.length; i++){
            if (i === products.length-1){
              productString += `${products[i]}`
            } else {
              productString += `${products[i]}, `
            }
          }
          console.log(productString)
          return productString
      }
        let templateParams = {
          from_name: 'christopher.murray.bbqdev@gmail.com',
          to_name: email,
          customerName: customerName,
          message_html: generateItemList()
         }
        emailjs.send(
          'service_6gxzrwa',
          'template_fu5eins',
           templateParams,
          'user_975JwJzPB6r4yxiDzOfHn'
     )
        for (let item in props.cartItems){
          axios
          .post('./updateQuantity', {quantity: (props.cartItems[item].originalQuantity - props.cartItems[item].quantity), productName: item}).then((result)=>{
            // console.log("result of update", result)

          })
          .catch((err)=>{
            console.log(err)
          })
        }
          handleClose()
          props.clearOrder()

      })
        .catch((err)=>{
          if (err){
            console.log(err);
          }
        })
        } else {
          alert('Please complete checkout form')
        }
      }

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Delivery Info</h2>
      <h3>Total ${props.priceString}</h3>
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
              <option value="Santa Rita Ranch South">Santa Rita Ranch South</option>
              <option value="Santa Rita Ranch North">Santa Rita Ranch North</option>
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
              minDate={new Date()}
              maxDate={new Date(2021, 1, 31)}
      //         disabledDays={[
      //   {
      //     after: new Date(2021, 1, 31),
      //     before: new Date(),
      //   }
      // ]}
      />
            {/* <br/> */}
          </label>
          <br />
          <Button
          className={classes.submitButton}
          type="submit"
          value="Submit"
          onMouseEnter={()=>{handleSubEnter()}}
          onMouseLeave={()=>{handleSubExit()}}
          >Submit
          </Button>
        </form>
      </div>
    </div>
  );
  console.log(new Date().toISOString().slice(0, 19).replace("T", " "));
  return (
    <div>
        {/* <ThemeProvider theme={theme}> */}
      <button
      className={classes.button}
      onClick={handleOpen}
      onMouseEnter={handleEnter}
      onMouseLeave={handleExit}>
      PROCEED TO CHECKOUT
      </button>
      {/* </ThemeProvider> */}
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
