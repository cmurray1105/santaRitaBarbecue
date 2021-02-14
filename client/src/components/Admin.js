import React from 'react';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import Orders from './Orders';
import Inventory from './Inventory';
import axios from 'axios';
const Admin = (props) =>{
  const [prodCategories, setCategories] = React.useState([])
  const [value, setValue] = React.useState(0);
  // const [selectedFile, setSelectedFile] = React.useState(null)
  // const [fileUploaded, setFileUploaded] = React.useState(null)
  const [currentPage, setPage] = React.useState((
  <div>
      <Orders />
    </div>
  ))
  const useStyles = makeStyles((theme) => ({
    paper: {
      justifyContent: "center",
      color: "red",
      backgroundColor: "white",
    },
    hovered: {
      color: "white",
      backgroundColor: "red",
    },
    scroller: {
      flexGrow: "0",
    },
  }));


  const classes = useStyles();

  let categories = ['orders', 'inventory', 'completed orders']
  const getCategories = () => {
    axios
    .get("/categories")
    .then((result) => {
      console.log("CUTE CAT DATA", result.data)
      setCategories(result.data)
    });
    };

  let mapTabs = categories.map((category) => {
    console.log(category);
    return (
      <Tab
        className={classes.paper}
        label={category}
      ></Tab>
    );
  });
  let convertPriceToString = (price) => {
    let priceString = price.toString();
    console.log("First String", priceString)
    if (priceString.includes(".")) {
      if (priceString.split(".")[1].length === 1) {
        console.log("NEW STRING", priceString);
        priceString += "0";
        console.log("STRING AGAIN", priceString);
      } else {
        priceString= priceString.split(".")[0] + '.' + priceString.split(".")[1].slice(0,2)
        console.log("STRINGY STRING STRING,", priceString)
      }
    } else {
      priceString += ".00";
    }
    return priceString;
  };

  React.useEffect(()=>{
    getCategories()
  },[])


  // const handleUpload = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.target);
  //   data.append("file", selectedFile, )
  // }
  // const singleFileUploadHandler = () => {
  //   event.preventDefault();
  //   const data = new FormData();
  // // If file selected
  //   if (selectedFile) {
  // data.append( 'file', selectedFile, selectedFile.name );
  // axios.post( '/upload', data)
  // .then((result)=>{
  //   console.log(result)
  // }).catch((err)=>{
  //   console.log("ERR!!!!!", err)
  // })
  //   }
  // }
      // headers: {
      //  'accept': 'application/json',
      //  'Accept-Language': 'en-US,en;q=0.8',
      //  'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      // }
  //     .then( ( response ) => {
  // if ( 200 === response.status ) {
  //       // If file size is larger than expected.
  //       if( response.data.error ) {
  //        if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
  //         console.log( 'Max size: 2MB', 'red' );
  //        } else {
  //         console.log( response.data );
  // // If not the given file type
  //         console.log( response.data.error, 'red' );
  //        }
  //       } else {
  //        // Success
  //        let fileName = response.data;
  //        console.log( 'fileName', fileName );
  //        console.log( 'File Uploaded', '#3089cf' );
  //       }
  //      }
  //     }).catch( ( error ) => {
  //     // If another error
  //     console.log( error, 'red' );
  //    });
  //   } else {
  //    // if file not selected throw error
  //   console.log( 'Please upload file', 'red' );
  //   }
  // };



  const handleChange = (event, newValue) => {
    console.log("CAT DAT", getCategories())
    setValue(newValue);
    // props.getProducts(categories[newValue]);
     if (categories[newValue] === 'orders'){
       let displayPage = (
         <div>
           <Orders />
         </div>
       )
       setPage(displayPage)
     } else if (categories[newValue] === 'inventory') {
      let displayPage = (
        <div>
          <Inventory
          // singleFileChangedHandler={singleFileChangedHandler}
          // singleFileUploadHandler={singleFileUploadHandler}
          // setSelectedFile={setSelectedFile}
          // selectedFile={selectedFile}
          convertPriceToString={convertPriceToString}
          categories={prodCategories}
          getCategories={getCategories}/>
        </div>
      )
      setPage(displayPage)
     } else {
      setPage(null)
     }
  };

  return(
  <div >
  <div className={'admin-header'}>
        <Tabs
        classes={{ root: classes.paper, scroller: classes.scroller }}
        value={value}
        variant={"scrollable"}
        scrollButtons="auto"
        onChange={handleChange}
        centered
      >
        {mapTabs}
      </Tabs>
      </div>
      <div>
        {currentPage}
      </div>
  </div>
  )
  }
export default Admin;