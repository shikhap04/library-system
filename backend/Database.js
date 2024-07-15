const mysql = require('mysql2');
const config = require('./config');

class Database {
  static pool = undefined;
  //Creates a pool only if it does not already exist
  static createPool() {
    if (this.pool === undefined) {
      this.pool = mysql.createPool(config);
    }
  }

  // Simple query into the database that returns a Promise
  static async query(command) {
    this.createPool();
    return new Promise((resolve, reject) => {
      this.pool.query(command, (err, result) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        else {
          return resolve(result);
        }
      });
    });
  }

  // Creates a SQL condition statement with a variable number of *optional* arguments
  static createConditionStatement(table, args_json) {
    const args = JSON.parse(args_json);
    const params = [];
    Object.entries(args).forEach(([key, value]) => {
      if (value) {
        params.push(`${table}.${key} = '${value}'`);
      }
    });
    if (params.length === 0) return ``;
    const condition = ` WHERE ` + params.join(` AND `);
    return condition;
  }

  // Creates a SQL update statement with a variable number of *optional* argument
  static createUpdateStatement(args_json) {
    const args = JSON.parse(args_json);
    const params = [];
    Object.entries(args).forEach(([key, value]) => {
      if (value) {
        params.push(`${key} = '${value}'`);
      }
    });
    if (params.length === 0) return ``;
    const update = ` SET ` + params.join(`, `);
    return update;
  }
}

module.exports = Database;