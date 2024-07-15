const config = require('./config');
const mysql = require('mysql2/promise');
const Database = require('./Database');

// Returns a string of employees
const getEmployees = async() => {
  const command = 'SELECT * FROM username_password';
    
    const result = await Database.query(command);
    if (result.length == 0) {
      console.log('No user found');
      return false;
    }
    const user = result[0];
    console.log('user:', user);
    return JSON.stringify(user);
};


// Returns an array of resources
const getResources = async() => {
  const command = 'SELECT * FROM resources;';
    
    const result = await Database.query(command);
    if (result.length == 0) {
      console.log('No user found');
      return false;
    }
    const resources = result;
    //console.log(resources);
    // console.log('user:', user);
    //return JSON.stringify(resources);
    return resources;
};


module.exports = {
  getResources,
  getEmployees
};
