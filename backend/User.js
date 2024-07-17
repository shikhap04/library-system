class User {
  name = '';                // User's real name
  user_id = '';             // Unique user ID
  account_level = '';           // User type, one of {Employee, Manager, Admin}

  constructor(name, user_type, user_id = '') {
    this.name = name;
    this.user_type = user_type;
    this.account_level = account_level;
  }
}

module.exports = User;