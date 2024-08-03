const { EnvironmentPlugin } = require('webpack');
const Database = require('../Database');
const { user } = require('../config');

const reduceCount = async(numSpots, event_id) => {
    const command = `UPDATE events SET spotsLeft = spotsLeft - ${numSpots} WHERE event_id = ${event_id};`;

    try {
        const result = await Database.query(command);
        if (result) {
            console.log('success in commands', result);
            return result;
          }
          else {
            console.log('fail in commands reduce command');
            return false;
          }

    } catch (error) {
        console.log('error in commands reduce command', error);
        return null;
    }
}
const increaseCount = async(numSpots, event_id) => {
    const command = `UPDATE events SET spotsLeft = spotsLeft + ${numSpots} WHERE event_id = ${event_id};`;

    try {
        const result = await Database.query(command);
        if (result) {
            console.log('success in commands', result);
            return result;
          }
          else {
            console.log('fail in commands increase command');
            return false;
          }

    } catch (error) {
        console.log('error in commands increase command', error);
        return null;
    }
}

const checkRSVP = async(event_id, user_id) => {
    const command = `SELECT * FROM eventRSVP WHERE user_id = '${user_id}' AND event_id = ${event_id};`;

    const result = await Database.query(command);
    if (result.length == 0) {
        console.log('RSVP doesn\'t exist');
        return false;
    } else {
        console.log('RSVP exists')
        return result;
    }
}

const addRSVP = async(RSVP) => {
    const {
        event_id,
        user_id,
        numSpots
    } = RSVP;
    const rsvpExists = await checkRSVP(event_id, user_id);
    console.log('rsvp exist', rsvpExists);
    if (rsvpExists) {
        return false;
    }
    const command = `INSERT INTO eventRSVP (event_id, user_id, numSpots) VALUES(${event_id}, '${user_id}', ${numSpots});`

    try {
        const result = await Database.query(command);
        reduceCount(numSpots, event_id);
        if (result) {
            console.log('success in commands', result);
            return result;
          }
          else {
            console.log('fail in commands');
            return null;
          }

    } catch (error) {
        console.log('error in commands', error);
        return null;
    }
};

const deleteRSVP = async(RSVP) => {
    const {
        event_id,
        user_id,
        numSpots
    } = RSVP;

    const command = `DELETE FROM eventRSVP WHERE event_id = ${event_id} AND user_id = '${user_id}'`;
    try {
        const result = await Database.query(command);
        increaseCount(numSpots, event_id);
        console.log(result); 
    } catch (error) {
        console.log('error in commands delte', error)
        return null;
    }
}

/**
 * 
 * const deleteResource = async(resourceID) => {
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

 */

module.exports = {
    addRSVP,
    checkRSVP,
    deleteRSVP
}