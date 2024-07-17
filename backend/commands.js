const config = require('./config');
const mysql = require('mysql2/promise');
const Database = require('./Database');

/** Returns a string of employees */
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


/** Returns an array of all resources in alphabetical order*/ 
const getAllResources = async() => {
  const command = 'SELECT * FROM resources ORDER BY resource_name;';
    
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

/** Finds Resources by field and value
 * @param field The field to search by name, author, location, genre, type
 * @param value The value to search for within in the field
 */
const getResource = async(field, value) => {
  var command = 'SELECT * FROM resources;'
  switch (field) {
    case ('resource_name'):
      command = `SELECT * FROM resources WHERE resource_name = '${value}';`;
      break;
    case ('author'):
      command = `SELECT * FROM resources WHERE author = '${value}' ORDER BY resource_name;`;
      break;
    case ('location'):
      command = `SELECT * FROM resources WHERE location = '${value}' ORDER BY resource_name;`;
      break;
    case ('genre'):
      command = `SELECT * FROM resources WHERE genre = '${value}' ORDER BY resource_name;`;
      break;
    case ('resource_type'):
      command = `SELECT * FROM resources WHERE resource_type = '${value}' ORDER BY resource_name;`;
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
