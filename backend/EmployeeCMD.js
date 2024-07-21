
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



module.exports = {
  getAllResources,
  getResource,
  getEmployees
};
