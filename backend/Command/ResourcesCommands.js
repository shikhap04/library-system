
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

const addResource = async(info) => {
  const findMaxIdCommand = `SELECT MAX(resource_id) AS max_id FROM resources;`
  let resource_id = -1;
  try {
    const result = await Database.query(findMaxIdCommand);
    if (result <= 0) {
      return null;
    }
    resource_id = result[0].max_id + 1;
    console.log('new id', resource_id, typeof(resource_id));
  } catch (error) {
    console.log('error in finding maxID', error);
    return null;
  }

  const {
    resource_name,
    author,
    location,
    resource_description,
    genre,
    total_copies,
    copies_available,
    resource_version,
    resource_type
  } = info;

  const command = `INSERT INTO resources 
  (resource_id, resource_name, author, location, resource_description, genre, total_copies, copies_available, resource_version, resource_type)
  VALUES (${resource_id}, '${resource_name}', '${author}', '${location}', '${resource_description}', '${genre}', ${total_copies}, ${copies_available}, '${resource_version}', '${resource_type}');`

  try {
    const result = await Database.query(command);
    if (result) {
      console.log('success in commands', result);
      return result;
    }
    else {
      console.log('fail in commands');
      return false;
    }
  } catch (error) {
    console.error('Error adding resource:', error);
    return null;
  }

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
    console.log('issue in resource commands', error);
    return null;
  }
};

const deleteResource = async(resourceID) => {
  const command = `DELETE FROM resources WHERE resource_id = ${resourceID};`;
  try {
    const result = await Database.query(command);
    console.log(result);
    return result;
  } catch (error) {
    console.log('issue in resource commands ', error);
    return null;
  }
}

  module.exports = {
    getAllResources,
    getResource,
    addResource,
    updateResource,
    deleteResource,
  };