const Database = require('../Database');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');

// JUST LOGGING IN AND ADDING AN ACCOUNT




const validateAccount = async(username, password) => {
    const password_hashed = await bcrypt.hash(password, 5); 
    const command = `SELECT * FROM accounts
                    WHERE accounts.user_name = '${username}'
                    AND accounts.pass_word = '${password_hashed}';`
      
    const result = await Database.query(command);
    if (result.length >= 0) {
        const user = result[0];
        //console.log('user in commands:', user.pass_word);
        //console.log('type of', typeof(user.pass_word));
        return JSON.stringify(user);
    } else {
        console.log('No users matching that');
        return false;
    }
  };

const createAccount = async(username, password, accountLevel) => {
    // need to check if username already exists?
    
    console.log('reached account commands');
    const user_id = uuid();
    const password_hashed = await bcrypt.hash(password, 5);
    const command = `INSERT INTO accounts (user_id, user_name, pass_word, accountLevel) VALUES('${user_id}', '${username}', '${password_hashed}', '${accountLevel}');`;

    const result = await Database.query(command);
    console.log(result);
    return result;
}


module.exports = {
    validateAccount,
    createAccount,
}