import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ProductModal from './ProductModal';

const Products = ({loaded, products, addToCart}) => {
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  const [open, setOpen] = React.useState(false);
  const [quantity, handleChange] = React.useState("0");
  const [customerName, handleNameChange] = React.useState('');
  const [currentProduct, setProduct] = React.useState({})
  // const [value, handleChange] = React.useState('');
  const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      marginTop: 25,
      marginBottom: 25,
    },
    media: {
      height: 250,
      width: 250
    },
  });

  const classes = useStyles();

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
      <h2 id="simple-modal-title">{currentProduct.product_name}</h2>
      <div className="order-form">
      <form onSubmit={handleSubmit}>

      <label>
          Quantity:
          <select onChange={e => handleChange(e.target.value)}>>
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
  let productData = []
  console.log(loaded)
  if (!loaded){
    return null;
  } else {
    productData = products
return (
<div>
  {productData.map((product)=>{
    console.log(product)
    let priceString = product.price.toString()
    console.log(priceString.length)
    if (priceString.includes('.')){
    if(priceString.split('.')[1].length ===1){
      priceString += '0'
    }
    } else {
      priceString+='.00'
    }

return(
  <div className='cardContainer'>

  <Card className={classes.root} onClick={()=>{
    setProduct(product)
    handleOpen()
    }}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={product.image_url}
          title={product.product_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.product_name}
          </Typography>
            {/* <ProductModal product={product} addToCart={addToCart}/> */}

          <Typography variant="body2" color="textSecondary" component="p">
          ${priceString}
            {/* <img className='card-image' src={product.image_url} /> */}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
</div>
)
  })
}
  </div>
  )
  }
}
export default Products;