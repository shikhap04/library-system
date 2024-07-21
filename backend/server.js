const express = require('express');
const cors = require('cors');

const ResourceCommands = require('./Command/ResourcesCommands');
const EmployeeCommands = require('./Command/UserCommands');
const AccountCommands = require('./Command/AccountCommands');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());


app.get('/employees/all', async (req, res) => {
  try {
    const AllEmployees = await EmployeeCommands.getAllUsers();
    res.json(AllEmployees);
    console.log("trying to fetch employees")
  } catch (error) {
    console.log('ISSUE IN APP.GET')
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

app.get('/resources/all', async (req, res) => {
  try {
    const AllResources = await ResourceCommands.getAllResources();
    res.json(AllResources);
    //console.log('Resources: ', resources);
    //console.log('trying to fetch resources')
  } catch (error) {
    console.log('issues with sending');
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

app.post('/search/resources', async (req, res) => {
  const {field, query} = req.body;
  try {
    const filteredResources = await ResourceCommands.getResource(field, query);
    res.json(filteredResources);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

app.post('/login/validate', async (req, res) => {
  const {username, password} = req.body;
  try {
    const validAccount = await AccountCommands.validateAccount(username, password);
    res.json(validAccount);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to login' });
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




//https://zapier.com/blog/how-to-connect-database-mysql/
// const config = require('./config')
// const mysql = require('mysql2');
// const express = require('express');
// const application = express();
// const port = 3000;

// const express = require('express');
// const application = express();
// const port = 3000;

// // create a new MySQL connection
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'librarysystem'
// });
// // connect to the MySQL database
// connection.connect((error)=>{
//   if(error){
//     console.error('Error connecting to MySQL database:', error);
//   }else{
//     console.log('Connected to MySQL database!');
//   }
// });

// const newEmployee = {user_id : 1, user_name: 'employee1', pass_word: 'pass1'};
// connection.query('SELECT user_id, user_name, pass_word account_level FROM username_password', function (err, result, fields) {
//   if (err) {
//   console.error('Error inserting data:', err);
//   return;
//   }
//   application.get('/', (req, res) => {
//     res.send(result)
//    })
//  });


//  application.listen(port, () => {
//   console.log('example app listening on port ${port}')
//  })

 
// // close the MySQL connection
// connection.end();