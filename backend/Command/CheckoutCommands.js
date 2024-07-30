const Database = require('../Database');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const { user } = require('../config');

const checkOut = async(userid, resourceid) => {
    console.log('resource to be checked out:', resourceid);
    console.log('user checking out: ', userid);
    // Checks availability
    const resourceCommand = `SELECT * FROM resources
                    WHERE resources.resource_id = '${resourceid}' and resources.copies_available > 0;`
    const resourceResult = await Database.query(resourceCommand);
    if (resourceResult == 0) { // No availability
        console.log('no copies available for:', resourceid);
        return false;
    } else { // There is availability
        // Updates availability
        const updateCommand = `UPDATE resources
                        SET resources.copies_available = resources.copies_available - 1
                        WHERE resources.resource_id = '${resourceid}';`
        const updateResult = await Database.query(updateCommand);
        // Updates checkouts table
        const logCheckout = `INSERT INTO checkouts
                        VALUES ('${userid}','${resourceid}', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 14 DAY), true);`
        const logResult = await Database.query(logCheckout);
        console.log('checkout complete');
        return true;
    }
};

const returnResource = async(userid, resourceid) => {
    console.log('resource to be returned:', resourceid);
    console.log('user returning: ', userid);
    // Checks availability
    const resourceCommand = `SELECT * FROM resources
                    WHERE resources.resource_id = '${resourceid}' and resources.copies_available < resources.total_copies;`
    const resourceResult = await Database.query(resourceCommand);
    if (resourceResult == 0) { // already at max total copies
        console.log('invalid return for:', resourceid);
        return false;
    } else { // valid return
        // Updates availability
        const updateCommand = `UPDATE resources
                        SET resources.copies_available = resources.copies_available + 1
                        WHERE resources.resource_id = '${resourceid}';`
        const updateResult = await Database.query(updateCommand);
        // Updates checkouts table
        const logReturn = `UPDATE checkouts
                        SET user_has_book = false
                        WHERE user_id = '${userid}' and resource_id = '${resourceid}' and user_has_book = true);`
        const logResult = await Database.query(logReturn);
        console.log('return complete');
        return true;
    }
};

module.exports = {
    checkOut,
    returnResource
}