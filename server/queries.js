const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'FILL_ME_IN',
  password: 'FILL_ME_IN',
  database: 'FILL_ME_IN'
});

connection.connect();
