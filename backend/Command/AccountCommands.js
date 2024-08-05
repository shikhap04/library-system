const Database = require('../Database');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');

// JUST LOGGING IN AND ADDING AN ACCOUNT

const usernameExists = async(username) => {
    console.log('checking username: ', username);
    const command = `SELECT * FROM accounts
                    WHERE accounts.user_name = '${username}';`
    const result = await Database.query(command);
    if (result.length == 0) {
        console.log('user doesn\'t exist', username);
        return false;
    } else {
        console.log('user exists', username)
        return true;
    }
};


const validateAccount = async(username, password) => {
    //const password_hashed = await bcrypt.hash(password, 5); 
    const command = `SELECT * FROM accounts
                    WHERE accounts.user_name = '${username}';`
      
    const result = await Database.query(command);
    if (result.length > 0) {
        const user = result[0];
        console.log('user in commands:', user.pass_word);
        console.log('type of', typeof(user.pass_word));
        const passwordCorrect = await bcrypt.compare(password, user.pass_word);
        if (!passwordCorrect) {
            return false;
        }
        return JSON.stringify(user);
    } else {
        console.log('No users matching that');
        return false;
    }
  };

const createAccount = async(username, password, accountLevel) => {
    console.log('reached account commands');
    // need to check if username already exists?
    const exists = await usernameExists(username);
    if (exists) {
        return false;
        // could return a string and check in server?
    }
    const user_id = uuid();
    const password_hashed = await bcrypt.hash(password, 10);
    const command = `INSERT INTO accounts (user_id, user_name, pass_word, accountLevel) VALUES('${user_id}', '${username}', '${password_hashed}', '${accountLevel}');`;

    try {
        const result = await Database.query(command);
        console.log(result);
        return result;
    } catch (error) {
        console.log('issue in commands', error);
        return null;
    }

}

const deleteAccount = async(username) => {
    console.log('reached account commands delete');
    const exists = await usernameExists(username);
    if (!exists) {
        return false;
        // could return a string and check in server?
    }

    const command = `DELETE FROM accounts WHERE user_name = '${username}';`
    try {
        const result = await Database.query(command);
        console.log(result);
        return result;
    } catch (error) {
        console.log('issue in commands', error);
        return false;
    }

}


module.exports = {
    validateAccount,
    createAccount,
    deleteAccount,
}