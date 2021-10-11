const expressJwt = require('express-jwt');
const config = require('../config.json');

let { secret } = config;

let whiteListUrls = new Set();
whiteListUrls.add('/users/');
whiteListUrls.add('/users/isEmailExsist');
whiteListUrls.add('/users/isIdExsist');
whiteListUrls.add('/users/login');
whiteListUrls.add('/products/');

function authenticateJwtRequestToken() {

return expressJwt({ secret, algorithms: ['sha1', 'RS256', 'HS256'] }).unless(request => {
    console.log("Method = " + request.method);
    console.log("request.url = " + request.url);

    if (request.method == 'POST' && request.url.endsWith('/users')) {
        console.log("Returned true")
        return true;
    }

    if (request.method == 'PUT' && request.url.endsWith('/register')) {
        console.log("Returned true")
        return true;
    }

    if (request.method == 'GET' && request.url.endsWith('/numberOfOrders')) {
        console.log("Returned true")
        return true;
    }

    // If the url resides in our whitelist urls
    if (whiteListUrls.has(request.url)) {
        return true;
    }

    return false;
});
}

module.exports = authenticateJwtRequestToken;