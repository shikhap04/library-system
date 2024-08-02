const Database = require('../Database');

const getAllEvents = async(isAdmin) => {
    var command = `SELECT * FROM events WHERE approved = TRUE;`;
    if (isAdmin) {
        command = `SELECT * FROM events;`;
    }
    
    const result = await Database.query(command);
    if (result.length == 0) {
        console.log('No events');
        return false;
    }
    //console.log(result);
    return result;
};

const getEvent = async(event_id) => {
    const command = `SELECT * FROM events WHERE event_id = ${event_id};`;
    const result = await Database.query(command);
    if (result.length == 0) {
        console.log('No event have that event id');
        return false;
    }
    //console.log(result);
    return result;
};


const addEvent = async(info) => {
    const findMaxIdCommand = `SELECT MAX(event_id) AS max_id FROM events;`
    let event_id = -1;
    try {
      const result = await Database.query(findMaxIdCommand);
      if (result <= 0) {
        return null;
      }
      event_id = result[0].max_id + 1;
      console.log('new id', event_id, typeof(event_id));
    } catch (error) {
      console.log('error in finding maxID', error);
      return null;
    }
  
    const {
      event_name,
      event_desc,
      startTime,
      endTime,
      approved,
      spotsTotal,
      spotsLeft
    } = info;
  
    const command = `INSERT INTO events 
    (event_id, event_name, event_desc, startTime, endTime, approved, spotsTotal, spotsLeft)
    VALUES (${event_id}, '${event_name}', '${event_desc}', '${startTime}', '${endTime}', '${approved}', ${spotsTotal}, ${spotsLeft});`
  
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
      console.error('Error adding event:', error);
      return null;
    }
  
  };


const updateEvent = async(event_id, updatedInfo) => {
    argsJson = JSON.stringify(updatedInfo)
    const update = Database.createUpdateStatement(argsJson);
    if (update === '') return false;
    
    const command = `UPDATE events` + update + ` WHERE event_id = ${event_id};`;
    console.log(command);
  
    try {
      const result = await Database.query(command);
      return result;
    } catch (error) {
      console.log('issue in events commands updating', error);
      return null;
    }
  };
  

const deleteEvent = async(event_id) => {
    const command = `DELETE FROM events WHERE event_id = ${event_id};`;
    try {
      const result = await Database.query(command);
      console.log(result);
      return result;
    } catch (error) {
      console.log('issue in events commands deleting', error);
      return null;
    }
  }

module.exports = {
    getAllEvents,
    getEvent,
    addEvent,
    updateEvent,
    deleteEvent,
};
