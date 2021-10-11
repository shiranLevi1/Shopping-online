let tokenToUserDetailsMap = new Map();
let cartIdMap = new Map();

async function get(token){
    if (token == null){
        throw new Error("Invalid key, failed to retrieve data from cache");
    }
    return tokenToUserDetailsMap.get(token);
}

async function set(token, userData){
    tokenToUserDetailsMap.set(token, userData);
}

async function getCartId(userId){
    if (userId == null){
        throw new Error("Invalid key, failed to retrieve data from cache");
    }
    return cartIdMap.get(userId);
}

async function setCartId(userId, cartId){
    cartIdMap.set(userId, cartId);
}

function extractUserDataFromCache(request) {
    let authorizationString = request.headers["authorization"];
    // Removing the bearer prefix, leaving the clean token
    let token = authorizationString.substring("Bearer ".length);
    let userData = get(token);
    return userData;
}

function extractCartIdFromCache(userId) {
    let cartId = getCartId(userId);
    return cartId;
}

module.exports = {
    set,
    get,
    extractUserDataFromCache,
    setCartId,
    getCartId,
    extractCartIdFromCache,
}