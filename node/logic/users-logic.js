const usersDao = require("../dao/users-dao");
const crypto = require("crypto");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
const jwt = require('jsonwebtoken');
const config = require('../config.json');
let cacheModule = require('../dao/cache-module');

const saltRight = "ddkjhjfh@e#$@e%j^9dheh";
const saltLeft = "+_$#^kbhgbjg$t5gf@rh";

async function register(registrationData) {
    registrationData.password = await hash(registrationData.password);
    await usersDao.register(registrationData);
}

async function login(email, password) {
    password = await hash(password);
    let userLogin = await usersDao.login(email, password);
    await isUserExsist(userLogin);
    await isNewCustomer(userLogin.isNew, email);
    let token = jwt.sign({ sub: userLogin.userType }, config.secret);
    let cartId = await openNewCart(userLogin.userId);
    cacheModule.set(token, { userType: userLogin.userType, userId: userLogin.userId });
    cacheModule.setCartId(userLogin.userId, cartId);
    return { token, userType: userLogin.userType, fullName: userLogin.fullName, isNewCustomer: userLogin.isNew };
}

async function hash(password) {
    password = crypto.createHash("md5").update(saltLeft + password + saltRight).digest("hex");
    return password;
}

async function getUserDetails(userId) {
    let userDetails = await usersDao.getUserDetails(userId);
    return userDetails;
}

async function updateUserData(userData, userId) {
    await usersDao.updateUserData(userData, userId);
}

async function updateUserEmail(email, userId) {
    let isEmailInUse = await usersDao.isEmailInUse(email, userId);
    if(isEmailInUse != 1){
        await usersDao.updateUserEmail(email, userId);
    }
}

async function getToday() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let hour = today.getHours();
    let min = today.getMinutes();

    let fixedToday = yyyy + '-' + mm + '-' + dd + " " + hour + ':' + min + ':' + '00';

    return fixedToday;
}

async function openNewCart(userId) {
    let dateTime = await getToday();
    let cartsId = await usersDao.getCartId(userId);
    if (cartsId == 0) {
        await usersDao.createCart(dateTime, userId);
    }
    let cartsIdArray = await usersDao.getCartId(userId);
    for(let index = 0; index < cartsIdArray.length; index++){
        if(cartsIdArray[index].isOpenCart == 1){
            return cartsIdArray[index].cartId;
        }
    }
}

async function isEmailExsist(email) {
    let isEmailExsist = await usersDao.isEmailExsist(email);

    if(isEmailExsist != 1){
        return false;
    }

    return true;
}

async function isIdExsist(id) {
    let isIdExsist = await usersDao.isIdExsist(id);

    if(isIdExsist != 1){
        return false;
    }

    return true;
}

async function isUserExsist(userData) {
    if(userData != null){
        return true;
    }
    
    throw new ServerError(ErrorType.UNAUTHORIZED);
}

async function isNewCustomer(isNew, email) {
    if(isNew == 1){
        await usersDao.unNewCustomer(email);
        return true;
    }

    return false;
}

    module.exports = {
        register,
        login,
        isEmailExsist,
        getUserDetails,
        updateUserData,
        updateUserEmail,
        isIdExsist
    }