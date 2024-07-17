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
const getAllResources = async() => {
  const command = 'SELECT * FROM resources;';
    
    const result = await Database.query(command);
    if (result.length == 0) {
      console.log('No resources');
      return false;
    }
    const resources = result;
    //console.log(resources);
    // console.log('user:', user);
    //return JSON.stringify(resources);
    return resources;
};

const getResource = async(field, value) => {
  var command = 'SELECT * FROM resources;'
  switch (field) {
    case ('resource_name'):
      command = `SELECT * FROM resources WHERE resource_name = '${value}';`;
      break;
    case ('author'):
      command = `SELECT * FROM resources WHERE author = '${value}';`;
      break;
    case ('location'):
      command = `SELECT * FROM resources WHERE location = '${value}';`;
      break;
    case ('genre'):
        command = `SELECT * FROM resources WHERE genre = '${value}';`;
        break;
    case ('resource_type'):
          command = `SELECT * FROM resources WHERE resource_type = '${value}';`;
          break;
  }

  const result = await Database.query(command);
  if (result.length == 0) {
    console.log('No Resources Here');
    return false;
  }
  const resources = result;
  console.log(resources)
  return resources;
}


module.exports = {
  getAllResources,
  getResource,
  getEmployees
};
