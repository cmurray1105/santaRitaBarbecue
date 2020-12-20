const express = require('express');
const app = express();
const path = require('path');
const db = require('../db/queries')
require('dotenv').config()
const PORT = '3000'


app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json())

app.get('/products', (req, res)=>{
  console.log('server', req.query.product)
  db.getMeats(req.query.product, (err, result)=>{
    if (err){
      console.log(err)
    } else {
      console.log(result)
      res.send(result)
    }
  })
})
app.post('/addOrder', (req, res)=>{
  console.log('server', req.query)
  db.addDelivery
})

app.listen(PORT, () => {
  console.log(`server is CONNECTED on PORT:${PORT}`);
});
