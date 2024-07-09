//https://zapier.com/blog/how-to-connect-database-mysql/

const mysql = require('mysql2');
const express = require('express');
const application = express();
const port = 3000;

// create a new MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'librarysystem'
});
// connect to the MySQL database
connection.connect((error)=>{
  if(error){
    console.error('Error connecting to MySQL database:', error);
  }else{
    console.log('Connected to MySQL database!');
  }
});

const newEmployee = {user_id : 1, user_name: 'employee1', pass_word: 'pass1'};
connection.query('SELECT user_id, user_name, pass_word FROM username_password', function (err, result, fields) {
  if (err) {
  console.error('Error inserting data:', err);
  return;
  }
  application.get('/', (req, res) => {
    res.send(result)
   })
 });


 application.listen(port, () => {
  console.log('example app listening on port ${port}')
 })

 
// close the MySQL connection
connection.end();