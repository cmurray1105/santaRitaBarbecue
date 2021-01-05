
const path = require('path')
require('dotenv').config()
const mysql = require('mysql');
const logMeIn = require('./secret')
const connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME  || logMeIn.HOST,
  user: process.env.RDS_USERNAME ||logMeIn.DB_USER,
  password: process.env.RDS_PASSWORD || logMeIn.DB_PASSWORD,
  database: process.env.RDS_DB_NAME || logMeIn.DATABASE
});

connection.connect((err) => {
  if (err) {
    console.log("DB CONNECTION FAILED", err);
    return;
  }
  console.log("Connected to BBQ DB");
  console.log(process.env.DB_PASSWORD)
});

getProducts = (category, cb) =>{
  connection.query(`SELECT * FROM product WHERE category = ?;`, [category], (err, result) =>{
    if (err) {
      cb (err, null)
    } else {
      cb (null, result)
  }
})
}
addDelivery = (params, cb) => {
  connection.query('INSERT INTO cart (street_address, name, city, ordered_at, scheduled_delivery, neighborhood, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?);', params, (err, results)=>{
    if (err) {
      cb(err, null)
    } else {
      cb(null, results)
    }
  })
}
addItemToOrder= (params, cb) => {
  // console.log("params", typeof params)
  connection.query('INSERT INTO cart_item (product_id, cart_id, quantity) VALUES (?, ?, ?);', params, (err, result)=>{
    if (err) {
      cb(err, null)
    } else {
      cb(null, result)
    }
  })
}

getOrders = (cb)=>{
  connection.query('SELECT cart.id, cart_item.quantity, product.product_name, product.price, cart.scheduled_delivery, cart.neighborhood, cart.name, cart.street_address, cart.phone, cart.email FROM ((cart_item INNER JOIN product ON cart_item.product_id = product.id) INNER JOIN cart on cart_item.cart_id = cart.id);', (err, result)=>{
  if (err) {
    cb (err, null)
  } else {
    cb (null, result)
    console.log(result)
  }
})
}
updateQuantity = (params, cb)=>{
  console.log("params in quantity update", params)
  console.log("query called")
  connection.query('UPDATE product SET QUANTITY =? WHERE product.product_name=?', params, (err, result)=>{
    if (err) {
      cb(err, null)
    } else {
      cb(null, result)
    }
})
}

module.exports ={getProducts, getOrders, addDelivery, addItemToOrder, updateQuantity}