const ordersLogic = require("../logic/orders-logic");
const express = require("express");
const router = express.Router();
const cacheModule = require("../dao/cache-module");

router.get("/getUserOrders", async (request, response, next) => {
    try {
        let userData = await cacheModule.extractUserDataFromCache(request);
        let userId = userData.userId;
        const allOrders = await ordersLogic.getUserOrders(userId);
        console.log(allOrders);
        response.json(allOrders);
    }
    catch (e) {
        return next(e);
    }
});

router.get("/numberOfOrders", async (request, response, next) => {
    try {
        const numberOfOrders = await ordersLogic.getNumberOfOrders();
        response.json(numberOfOrders);
    }
    catch (e) {
        return next(e);
    }
});

router.post("/isAbleShippingDate", async (request, response, next) => {
    try {
        let shippingOrderData = request.body.shippingOrderData;

        const isAbleShippingDate = await ordersLogic.isAbleShippingDate(shippingOrderData);
        response.json(isAbleShippingDate);
    }
    catch (e) {
        return next(e);
    }
});

router.post("/newOrder", async (request, response, next) => {
    try {
        let orderData = request.body;
        let userData = await cacheModule.extractUserDataFromCache(request);
        let userId = userData.userId;
        let cartId = await cacheModule.extractCartIdFromCache(userId);
        await ordersLogic.newOrder(orderData, cartId, userId);

        response.json();
    }
    catch (e) {
        return next(e);
    }
});

router.get("/orderDetails", async (request, response, next) => {
    try {
        let userData = await cacheModule.extractUserDataFromCache(request);
        let userId = userData.userId;
        let cartId = await cacheModule.extractCartIdFromCache(userId);
        const userDetails = await ordersLogic.getOrderDetails(cartId, userId);
        response.json(userDetails);
    }
    catch (e) {
        return next(e);
    }
});
module.exports = router;