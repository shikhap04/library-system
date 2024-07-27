
const Database = require('../Database')

/** Returns an array of all resources in alphabetical order*/
const getAllResources = async() => {
    const command = 'SELECT * FROM resources ORDER BY resource_name;';
      
      const result = await Database.query(command);
      if (result.length == 0) {
        console.log('No resources');
        return false;
      }
      return result;
  };
  
  /** Finds Resources by field and value
   * @param field The field to search by name, author, location, genre, type
   * @param value The value to search for within in the field
   */
const getResource = async(field, value) => {
    var command = 'SELECT * FROM resources;';
    switch (field) {
      case ('resource_id'):
        command = `SELECT * FROM resources WHERE resource_id = ${value};`;
        break;
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
    return result;
  };

const updateResource = async(resourceID, updatedInfo) => {
  argsJson = JSON.stringify(updatedInfo)
  const update = Database.createUpdateStatement(argsJson);
  if (update === '') return false;
  
  const command = `UPDATE resources` + update + ` WHERE resource_id = ${resourceID};`;
  console.log(command);

  try {
    const result = await Database.query(command);
    return result;
  } catch (error) {
    console.log('issue in resource server', error);
    return null;
  }
};

  module.exports = {
    getAllResources,
    getResource,
    updateResource,
  };