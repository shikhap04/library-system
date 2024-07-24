
function checkAlphaNumeric(str) {
    return str.match(/^[a-zA-Z0-9]+$/) !== null;
}

module.exports = {
    checkAlphaNumeric,
}