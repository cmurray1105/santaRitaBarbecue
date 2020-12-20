import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Modal } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ProductModal from './ProductModal';

const Sides = ({loaded, sides, addToCart}) => {
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let sideData = []
  console.log(loaded)
  if (!loaded){
    return null;
  } else {
    sideData = sides
return (
<div>
  {sideData.map((side)=>{
    console.log(side)
    let priceString = side.price.toString()
    console.log(priceString.length)
    if (priceString.includes('.')){
    if(priceString.split('.')[1].length ===1){
      priceString += '0'
    }
    } else {
      priceString += '.00'
    }

return(
  <div className='cardContainer'>

  <Card className='root'>
      <CardActionArea>
        <CardMedia
          className='media'
          image={side.image_url}
          title="BBQ Card"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {side.product_name}
          </Typography>
            <ProductModal addToCart ={addToCart} product={side}/>
          <Typography variant="body2" color="textSecondary" component="p">
          ${priceString}
            <img className='card-image' src={side.image_url} />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
</div>
)
  })
}
  </div>
  )
  }
}
export default Sides;