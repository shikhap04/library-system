const Database = require('../Database')

// JUST LOGGING IN AND ADDING AN ACCOUNT

const validateAccount = async(username, password) => {
    const command = `SELECT * FROM acccounts
                    WHERE accounts.user_name = '${username}'
                    AND accounts.pass_word = '${password}';`
      
    const result = await Database.query(command);
    if (result.length == 0) {
        console.log('No users matching that');
        return false;
    }
      
    const user = result[0];
    console.log('user:', user);
    return JSON.stringify(user);
  };


module.exports = {
    validateAccount,
}