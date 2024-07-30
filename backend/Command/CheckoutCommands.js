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

module.exports = {
    checkOut
}