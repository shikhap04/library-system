// const mysql = require('mysql2');

// // First you need to create a connection to the database
// // Be sure to replace 'user' and 'password' with the correct values
// const con = mysql.createConnection({
//   host: 'localhost',
//   user: 'user',
//   password: 'password',
//   database: 'resources'
// });

// con.connect((err) => {
//   if(err){
//     console.log('Error connecting to Db');
//     return;
//   }
//   console.log('Connection established');
// });

// con.end((err) => {
//   // The connection is terminated gracefully
//   // Ensures all remaining queries are executed
//   // Then sends a quit packet to the MySQL server.
// });
const mysql = require('mysql2');
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
// close the MySQL connection
connection.end();