const productsLogic = require("../logic/products-logic")
const express = require("express");
const router = express.Router();
const cacheModule = require("../dao/cache-module");

router.post("/", async (request, response, next) => {
    try {
        let productData = request.body;
        console.log(productData);
        await productsLogic.addProduct(productData);
        response.json();
    }
    catch (e) {
        return next(e);
    }
});

router.post("/uploadImage", async (request, response, next) => {
    try {
        let file = request.files.file;
        let imageStr = await productsLogic.uploadImage(file);
        console.log(imageStr);
        response.json(imageStr);
    }
    catch (e) {
        return next(e);
    }
});

router.put("/", async (request, response, next) => {
    try {
        let productData = request.body;
        await productsLogic.updateProduct(productData);
        response.json();
    }
    catch (e) {
        return next(e);
    }
});

router.get("/", async (request, response, next) => {
    try {
        const products = await productsLogic.getAllProducts();
        response.json(products);
    }
    catch (e) {
        return next(e);
    }
});

module.exports = router;
