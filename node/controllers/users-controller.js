const usersLogic = require("../logic/users-logic");
const express = require("express");
const router = express.Router();
const cacheModule = require("../dao/cache-module");

router.post('/login', async (request, response, next) => {
    
    try {
        let email = request.body.email;
        let userPassword = request.body.password;
        console.log(userPassword);
        let loginData = await usersLogic.login(email, userPassword);
        response.json(loginData);
    }
    catch (e) {
        return next(e);
    }
});

router.post("/", async (request, response, next) => {
    try {
        let registrationData = request.body;
        await usersLogic.register(registrationData);
        
        response.json();
    }
    catch (e) {
        return next(e);
    }
});

router.put("/isEmailExsist", async (request, response, next) => {
    try {
        let email = request.body.email;
    console.log(email);

        let isEmailExsist = await usersLogic.isEmailExsist(email);
        response.json(isEmailExsist);
    }
    catch (e) {
        return next(e);
    }
});

router.put("/isIdExsist", async (request, response, next) => {
    try {
        let id = request.body.id;
        let isIdExsist = await usersLogic.isIdExsist(id);
        response.json(isIdExsist);
    }
    catch (e) {
        return next(e);
    }
});

router.put("/", async (request, response, next) => {
    try {
        let userDetails = request.body;
        let userData = await cacheModule.extractUserDataFromCache(request);
        let userId = userData.userId;
        await usersLogic.updateUserData(userDetails, userId);

        response.json();
    }
    catch (e) {
        return next(e);
    }
});

router.put("/updateUserEmail", async (request, response, next) => {
    try {
        let userEmail = request.body.email;
        console.log(userEmail);
        let userData = await cacheModule.extractUserDataFromCache(request);
        let userId = userData.userId;
        await usersLogic.updateUserEmail(userEmail, userId);
        response.json();
    }
    catch (e) {
        return next(e);
    }
});

router.get("/", async (request, response, next) => {
    try {
        let userData = await cacheModule.extractUserDataFromCache(request);
        let userId = userData.userId;
        const userDetails = await usersLogic.getUserDetails(userId);
        response.json(userDetails);
    }
    catch (e) {
        return next(e);
    }
});

module.exports = router;