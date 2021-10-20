
const path = require('path')
// require('dotenv').config()
const mysql = require('mysql');
let SQL_HOST = 'localhost'
let SQL_USER = 'root'
let DB_PASSWORD = 'Bruins2011!'
let SQL_DATABASE = 'barbecue'
const connection = mysql.createConnection({
  host: SQL_HOST,
  user: SQL_USER,
  password: DB_PASSWORD,
  database: SQL_DATABASE,
  port: '3306'
});

connection.connect((err) => {
  if (err) {
    console.log("DB CONNECTION FAILED", err);
    return;
  }
  console.log("Connected to BBQ DB");
  console.log(DB_PASSWORD)
});

const getProducts = (category, cb) =>{
  connection.query(`SELECT * FROM product WHERE category = ?;`, [category], (err, result) =>{
    if (err) {
      cb (err, null)
    } else {
      cb (null, result)
  }
})
}
const addDelivery = (params, cb) => {
  connection.query('INSERT INTO orders (street_address, name, city, ordered_at, scheduled_delivery, neighborhood, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?);', params, (err, results)=>{
    if (err) {
      console.log("error: ", err)
      cb(err, null)
    } else {
      console.log("SUCCESS: ", results)
      cb(null, results)
    }
  })
}
const addItemToOrder= (params, cb) => {
  // console.log("params", typeof params)
  connection.query('INSERT INTO order_item (product_id, order_id, quantity) VALUES (?, ?, ?);', params, (err, result)=>{
    if (err) {
      cb(err, null)
    } else {
      cb(null, result)
    }
  })
}

const getOrders = (cb)=>{
  connection.query('SELECT orders.id, order_item.quantity, product.product_name, product.price, orders.scheduled_delivery, orders.neighborhood, orders.name, orders.street_address, orders.phone, orders.email FROM ((order_item INNER JOIN product ON order_item.product_id = product.id) INNER JOIN orders on order_item.order_id = orders.id);', (err, result)=>{
  if (err) {
    cb (err, null)
  } else {
    cb (null, result)
    console.log(result)
  }
})
}
const updateQuantity = (params, cb)=>{
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
const getCategories = (cb)=>{
  connection.query('SELECT * FROM categories', (err, result)=>{
    if (err) {
      cb(err, null)
    } else {
      cb(null, result)
    }
  })
}
const getInventory = (cb)=>{
  connection.query('SELECT * from product', (err, result)=>{
    if (err) {
      cb(err, null)
    } else {
      cb(null, result)
    }
  })
}
const addInventoryItem = (item, cb)=>{
  connection.query("INSERT INTO product (product_name, category, quantity, image_url, price) VALUES (?, ?, ?, ?, ?)", item, (err, result)=>{
    if (err){
      cb(err, null)
    }else{
      cb(null, result)
    }
  })
}

// let id = [5]
const removeInventoryItem = (id, cb)=>{
  console.log("id", id)
  connection.query("DELETE FROM `product` WHERE id = ?", id, (err, result)=>{
    if (err){
      cb(err, null)
    }else{
      cb(null, result)
    }
  })
}

module.exports ={removeInventoryItem, addInventoryItem, getProducts, getOrders, addDelivery, addItemToOrder, updateQuantity, getCategories, getInventory}
