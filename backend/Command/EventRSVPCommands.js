const { EnvironmentPlugin } = require('webpack');
const Database = require('../Database');

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


module.exports = {
    addRSVP,
    checkRSVP
}