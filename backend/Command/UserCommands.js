
const Database = require('../Database')

// THIS FILE WAS JUST TO TEST AT FIRST
// WILL CONTAIN THE FUNCTIONALITY OF A USER, I.E. WHAT ALL ACCOUNTS CAN DO, LIKE SEE WHAT BOOKS THEY'VE CHECKED OUT, DELETE OTHER ACCOUNTS

/** Returns a string of employees */
const getAllUsers = async() => {
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
  getAllUsers
};
