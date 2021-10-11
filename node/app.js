const express = require("express");
const server = express();

const cors = require("cors");

const fs = require("fs");
const fileUpload = require("express-fileupload");

if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

server.use(fileUpload());

server.use(express.static('public'));
server.use('/uploads', express.static('uploads'));

const usersController = require("./controllers/users-controller");
const productsController = require("./controllers/products-controller");
const ordersController = require("./controllers/orders-controller");
const cartsController = require("./controllers/carts-controller");

const errorHandler = require("./errors/error-handler");
const loginFilter = require("./middleware/loginFilter");

server.use(cors({ origin: "http://localhost:4200"}));
server.use(express.static(__dirname));

server.use(loginFilter());

server.use(express.json());
server.use("/users", usersController);
server.use("/products", productsController);
server.use("/orders", ordersController);
server.use("/carts", cartsController);

server.use(errorHandler);

server.listen(3001, () => console.log("Listening on http://localhost:3001"));