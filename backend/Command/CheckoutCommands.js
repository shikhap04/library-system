const Database = require('../Database');
// const { v4: uuid } = require('uuid');
// const bcrypt = require('bcrypt');
// const { user } = require('../config');
// const { get } = require('prompt');

// Process the checking out of a resourec
const checkOut = async(userid, resourceid) => {
    console.log('resource to be checked out:', resourceid);
    console.log('user checking out: ', userid);
    // Checks availability
    const resourceCommand = `SELECT * FROM resources
                    WHERE resources.resource_id = '${resourceid}' and resources.copies_available > 0;`;
    const resourceResult = await Database.query(resourceCommand);
    if (resourceResult == 0) { // No availability
        console.log('no copies available for:', resourceid);
        return false;
    } else { // There is availability
        // Updates availability
        const updateCommand = `UPDATE resources
                        SET resources.copies_available = resources.copies_available - 1
                        WHERE resources.resource_id = '${resourceid}';`;
        const updateResult = await Database.query(updateCommand);
        // Updates checkouts table
        const logCheckout = `INSERT INTO checkouts
                        VALUES ('${userid}','${resourceid}', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 14 DAY), false, false, false, false);`;
        const logResult = await Database.query(logCheckout);
        console.log('checkout complete');
        return true;
    }
};

// Process the return of a resource
const returnResource = async(userid, resourceid) => {
    console.log('resource to be returned:', resourceid);
    console.log('user returning: ', userid);
    // Checks availability
    const resourceCommand = `SELECT * FROM resources
                    WHERE resources.resource_id = '${resourceid}' and resources.copies_available < resources.total_copies`
    const resourceResult = await Database.query(resourceCommand);
    if (resourceResult == 0) { // already at max total copies
        console.log('invalid return for:', resourceid);
        return false;
    } else { // valid return
        // Updates availability
        const updateCommand = `UPDATE resources
                        SET resources.copies_available = resources.copies_available + 1
                        WHERE resources.resource_id = '${resourceid}';`;
        const updateResult = await Database.query(updateCommand);
        // Updates checkouts table
        const logReturn = `UPDATE checkouts
                        SET resource_returned = true
                        WHERE user_id = '${userid}' and resource_id = '${resourceid}' and user_has_resource = true;`;
        const logResult = await Database.query(logReturn);
        console.log('return complete');
        return true;
    }
};

// Returns a list of all checked out books by a user, ordered by due date
const getCheckedOutbyUser = async(userid) => {
    console.log('list for user: ', userid);
    const command = `SELECT *
    FROM resources r1, (
    SELECT * FROM checkouts
    WHERE user_id = '${userid}'AND return_approved = false) r2
    WHERE r1.resource_id = r2.resource_id;`;
    const result = await Database.query(command);
    if (result.length == 0) {
        console.log('no checkouts');
        return false;
    }
    return result;
};

// Returns a list of all checkouts not approved by an employee
const getAllUnapprovedCheckouts = async() => {
    const command = `SELECT * FROM resources r1, (
    SELECT * FROM checkouts
    WHERE checkout_approved = false) r2
    WHERE r1.resource_id = r2.resource_id;`;
    const result = await Database.query(command);
    if (result.length == 0) {
        console.log('no checkouts to be approved');
        return false;
    }
    return result;
}
// Approve checkouts
const approveCheckout = async(userid, resourceid, checkoutdate) => {
    console.log('checkout for: ', userid);
    console.log('checked out resource: ');
    console.log('checkout date: ', checkoutdate);
    const command = `SELECT * FROM checkouts
                    WHERE user_id = '${userid}' AND resource_id = '${resourceid}' AND checkout_date = CAST('${checkoutdate}' AS date);`;
    const result = await Database.query(command);
    if (result.length == 0) {
        console.log("no matching checkout");
        return false;
    } else {
        const approveCommand = `UPDATE checkouts
                            SET checkout_approved = true, user_has_resource = true
                            WHERE user_id = '${userid}' AND resource_id = '${resourceid}' AND checkout_date = '${checkoutdate}';`;
        const approveResult = await Database.query(approveCommand);
        return true;          
    }
}
// Returns a list of all returns not approved by an employee
const getAllUnapprovedReturns = async() => {
    const command = `SELECT * FROM resources r1, (
    SELECT * FROM checkouts
    WHERE checkout_approved = true AND resource_returned = true AND return_approved = false) r2
    WHERE r1.resource_id = r2.resource_id;`;
    const result = await Database.query(command);
    if (result.length == 0) {
        console.log('no returns to be approved');
        return false;
    }
    return result;
}

// Approves the return for a user
const approveReturn = async(userid, resourceid, checkoutdate) => {
    console.log('user returning: ', userid);
    console.log('resource returned: ', resourceid);
    console.log('date checked out: ', checkoutdate);

    const command = `SELECT * FROM checkouts
                    WHERE user_id = '${userid}' AND resource_id = '${resourceid}' AND checkout_date = CAST('${checkoutdate}' AS date);`;
    const result = await Database.query(command);
    if (result.length == 0) {
        console.log('no matching return');
        return false;
    }
    else {
        const approveCommand = `UPDATE checkouts
        SET return_approved = true
        WHERE user_id = '${userid}' AND resource_id = '${resourceid}' AND checkout_date = '${checkoutdate}';`;
        
        const approveResult = await Database.query(approveCommand);
        return true;
    }
}
module.exports = {
    checkOut,
    returnResource,
    getCheckedOutbyUser,
    getAllUnapprovedCheckouts,
    approveCheckout,
    getAllUnapprovedReturns,
    approveReturn
}