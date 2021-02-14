import React from "react";
import Button from '@material-ui/core/Button';
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";



export default function AddInventory(props) {
console.log("proppy props", props)
  const [open, setOpen] = React.useState(false);
  const [productName, handleChange] = React.useState("");
  const [quantity, handleQuantityChange] = React.useState(0);
  const [category, handleCategoryChange] = React.useState("Meats");
  const [categories, setCategories] = React.useState([])
  // const [startDate, setStartDate] = React.useState(new Date());
  const [imageUrl, handleImageChange] = React.useState("");
  const [price, handlePriceChange] = React.useState(null);
  const [background, setBackground]= React.useState('red');
  const [textColor, setTextColor] = React.useState('white')
  const [border, setBorder] = React.useState('none')
  const [subBackground, setSubBackground]= React.useState('red');
  const [subText, setSubTextColor] = React.useState('white')
  const [subBorder, setSubBorder] = React.useState('none')
  const [selectedFile, setSelectedFile] = React.useState(null)
  const [fileSelected, setFileSelected] = React.useState(false)

  const  singleFileChangedHandler = ( event ) => {
    console.log("EVENT TARGETY THING", event.target.files[0])
    let fileToUpload = event.target.files[0]
    setSelectedFile(fileToUpload)
      console.log("selected file after being selected", fileToUpload, selectedFile)
      // setFileSelected(true)
    singleFileUploadHandler(fileToUpload)
      };

console.log("CATS ARE CUTE", categories)
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
  // const getCategories = () => {
  //   axios
  //   .get("/categories")
  //   .then((result) => {
  //     console.log("CUTE CAT DATA", result.data)
  //     setCategories(result.data)
  //     console.log("CAT DATA SET AS CAT", categories)
  //   });
  //   };

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

  const singleFileUploadHandler = (selectedFile) => {
    const data = new FormData();
  // If file selected
    if (selectedFile) {
  data.append( 'profileImage', selectedFile, selectedFile.name );
  axios.post( '/profile-img-upload', data, {
      headers: {
       'accept': 'application/json',
       'Accept-Language': 'en-US,en;q=0.8',
       'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      }
     })
      .then( ( response ) => {
  if ( 200 === response.status ) {
        // If file size is larger than expected.
        if( response.data.error ) {
         if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
          console.log( 'Max size: 2MB', 'red' );
         } else {
          console.log( response.data );
  // If not the given file type
          console.log( response.data.error, 'red' );
         }
        } else {
         // Success
         let fileName = response.data;
         console.log( 'fileName', fileName );
         handleImageChange(fileName.location)
         console.log( 'File Uploaded', '#3089cf' );
        }
       }
      }).catch( ( error ) => {
      // If another error
      console.log( error, 'red' );
     });
    } else {
     // if file not selected throw error
     console.log( 'Please upload file', 'red', selectedFile );
    }
  }

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
  // ******************************

  // ******************************

  const handleSubmit = (event) => {
    event.preventDefault();
    // event.preventDefault();
    console.log(productName, category, quantity, price, imageUrl)
    axios
.post("/addItem", {
        productName: productName,
        category: category,
        quantity: quantity,
        imageUrl: imageUrl,
        price: price,
      }).then((result)=>{
        handleChange("")
        handleCategoryChange('Meats')
        handleQuantityChange(0)
        handleImageChange("")
        handlePriceChange(null)
        props.getInventory()
        handleClose()
      })

//       .then((result) => {
//       //   let generateItemList = ()=> {
//       //     let productString= ''
//       //     let products = []
//       //     for (let item in props.cartItems){
//       //       products.push(item)
//       //     }
//       //     for (let i = 0; i < products.length; i++){
//       //       if (i === products.length-1){
//       //         productString += `${products[i]}`
//       //       } else {
//       //         productString += `${products[i]}, `
//       //       }
//       //     }
//       //     console.log(productString)
//       //     return productString
//       // }

//       })
//         .catch((err)=>{
//           if (err){
//             console.log(err);
//           }
//         })
        }

      const createCategoryPulldown = ()=>{
        console.log("CATS IN THE PULLDOWN", props.categories)
        let categoryList = []
        for (let i = 0; i < props.categories.length; i++){
console.log("CAT ITEM", props.categories[i].name)
          categoryList.push( <option value={props.categories[i].name}>{props.categories[i].name}</option>)
        }
        return categoryList
      }
      // console.log()

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Add Product</h2>
      <div className="order-summary"></div>
      <div className="order-form">
        <form>
          <label>
            Product Name:
            <br />
            <input type="text" value={productName} onChange={(e)=>handleChange(e.target.value)} />
        </label>
          <br />
          <label>
            Quantity:
            <br />
            <input
            name="Quantity"
            type="number"
            value={quantity}
            onChange={(e)=> handleQuantityChange(e.target.value)} />

          </label>
          <br />
          <label>
            Category:
            <br />
            <select onChange={(e) => handleCategoryChange(e.target.value)}>
              {createCategoryPulldown()}
            </select>
            {/* <button>
              Add A Category
            </button> */}
          </label>
          <br />
          <label>
            Price:
            <br />
            <input
              type="text"
              value={price}
              onChange={(e) => handlePriceChange(e.target.value)}
            />
          </label>
          {/* ************************* */}
           <label>
          { /*  Image:
            <input type="file" onChange={(e)=>{
              console.log("FILE:", e.target.files[0])
              props.setSelectedFile(e.target.files[0])
              props.singleFileUploadHandler(e)}}

              /> */}

       <p className="card-text">Please upload an image</p>
       <input type="file" onChange={(event) => {
         console.log("FILESSSS", event.files)
         singleFileChangedHandler(event)}}/>
       <div className="mt-5">
       </div>

          {/* <button className="btn btn-info" onClick={props.singleFileUploadHandler}>Upload!</button> */}
          </label>
                 {/* ************************* */}
                        {/* ************************* */}
                               {/* ************************* */}
                                      {/* ************************* */}
          <br />
          <Button
          className={classes.submitButton}
          type="submit"
          value="Submit"
          onMouseEnter={()=>{handleSubEnter()}}
          onMouseLeave={()=>{handleSubExit()}}
          onClick={(event)=>{handleSubmit(event)}}
          >Add Item
          </Button>
        </form>
      </div>
    </div>
  );


  return (
    <div>
        {/* <ThemeProvider theme={theme}> */}
      <button
      className={classes.button}
      onClick={handleOpen}
      onMouseEnter={handleEnter}
      onMouseLeave={handleExit}>
      ADD AN ITEM
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
