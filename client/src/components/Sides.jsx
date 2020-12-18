import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Sides = ({loaded, sides}) => {

  let sideData = []
  console.log(loaded)
  if (!loaded){
    return null;
  } else {
    sideData = sides
return (
<div>
  {sideData.map((side)=>{
    console.log(side.image_url)
    console.log(side.image_url)
    let priceString = side.price.toString()
    console.log(priceString.length)
    if(priceString.split('.')[1].length ===1){
      priceString += '0'
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
          <Typography variant="body2" color="textSecondary" component="p">
          {priceString}
            <div className='card-body'>
            Short description about the side.
            <img className='card-image' src={side.image_url} />
            </div>
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