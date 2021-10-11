const cartsLogic = require("../logic/carts-logic");
const express = require("express");
const router = express.Router();
const cacheModule = require("../dao/cache-module");

router.get("/", async (request, response, next) => {
    try {
        console.log(request);
        let userData = await cacheModule.extractUserDataFromCache(request);
        let userId = userData.userId;
        let cartId = await cacheModule.extractCartIdFromCache(userId);
        const userCart = await cartsLogic.getUserCart(cartId);
        response.json(userCart);
    }
    catch (e) {
        return next(e);
    }
});

router.post("/", async (request, response, next) => {
    try {
        let productData = request.body;
        let userData = await cacheModule.extractUserDataFromCache(request);
        let userId = userData.userId;
        let cartId = await cacheModule.extractCartIdFromCache(userId);
        await cartsLogic.addProductToCart(productData, cartId);

        response.json();
    }
    catch (e) {
        return next(e);
    }
});

router.put("/", async (request, response, next) => {
    try {
        let productData = request.body;
        let userData = await cacheModule.extractUserDataFromCache(request);
        let userId = userData.userId;
        let cartId = await cacheModule.extractCartIdFromCache(userId);
        await cartsLogic.updateProductToCart(productData, cartId);

        response.json();
    }
    catch (e) {
        return next(e);
    }
});

router.delete("/", async (request, response, next) => {
    try {
        let userData = await cacheModule.extractUserDataFromCache(request);
        let userId = userData.userId;
        let cartId = await cacheModule.extractCartIdFromCache(userId);
        await cartsLogic.clearCart(cartId);

        response.json();
    }
    catch (e) {
        return next(e);
    }
});

router.delete("/openNewCart", async (request, response, next) => {
    try {
        let userData = await cacheModule.extractUserDataFromCache(request);
        let userId = userData.userId;
        await cartsLogic.openNewCart(userId);

        response.json();
    }
    catch (e) {
        return next(e);
    }
});

router.delete("/:id", async (request, response, next) => {
    try {
        let productId = request.params.id;
        await cartsLogic.removeItemFromCart(productId);
        response.json();
    }
    catch (e) {
        return next(e);
    }
});

module.exports = router;