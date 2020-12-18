import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Modal } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import BrisketModal from './BrisketModal';

const Meats = ({loaded, meats}) => {
  // const [open, setOpen] = React.useState(false);
  // const [currentMeat, setMeat] = React.useState(null)
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className='modal'>
      <h2 id="simple-modal-title"></h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );

  let meatData = []
  console.log(loaded)
  if (!loaded){
    return null;
  } else {
    meatData = meats
return (
<div>
  {meatData.map((meat)=>{
    console.log(meat)
    let priceString = meat.price.toString()
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
          image={meat.image_url}
          title="BBQ Card"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {meat.product_name}
          </Typography>
            <BrisketModal meat={meat}/>
          <Typography variant="body2" color="textSecondary" component="p">
          ${priceString}
          <div className='card-body'>
            Short description about the meat.
            <img className='card-image' src={meat.image_url} />
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
export default Meats;