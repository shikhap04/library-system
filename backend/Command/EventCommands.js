const Database = require('../Database');

const getAllEvents = async() => {
    const command = 'SELECT * FROM events;';
    const result = await Database.query(command);
    if (result.length == 0) {
        console.log('No events');
        return false;
    }
    console.log(result);
    return result;
  };

module.exports = {
    getAllEvents,
};