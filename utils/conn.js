const mysql = require('mysql');


var connection = mysql.createConnection({
  host: '135.394.24.125',
  user: 'your_user',
  password: 'your_pass',
  database: 'database_name'
});

connection.connect();

module.exports = connection;
