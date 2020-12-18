
const path = require('path')
require('dotenv').config()
const mysql = require('mysql');
const logMeIn = require('./secret')
const connection = mysql.createConnection({
  host: logMeIn.HOST,
  user: logMeIn.DB_USER,
  password: logMeIn.DB_PASSWORD,
  database: logMeIn.DATABASE
});

connection.connect((err) => {
  if (err) {
    console.log("DB CONNECTION FAILED", err);
    return;
  }
  console.log("Connected to BBQ DB");
  console.log(process.env.DB_PASSWORD)
});

getMeats = (category, cb) =>{
  connection.query(`SELECT * FROM product WHERE category = '${category}';`, (err, result) =>{
    if (err) {
      cb (err, null)
    } else {
      cb (null, result)
  }
})
}
module.exports ={getMeats}