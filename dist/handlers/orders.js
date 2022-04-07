"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const user_1 = require("./user");
const store = new order_1.OrderStore();
const index = async (req, res) => {
    try {
        const orders = await store.index();
        res.json(orders);
    }
    catch (error) {
        console.log('kk ', error);
        res.status(400);
        res.send(error);
    }
};
const create = async (req, res) => {
    try {
        console.log(req.body);
        const order = {
            status: req.body.status,
            userId: req.body.userId,
        };
        const newOrder = await store.create(order);
        res.json(newOrder);
    }
    catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
};
const show = async (req, res) => {
    try {
        const order = await store.show(req.params.id);
        res.json(order);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const addProduct = async (req, res) => {
    try {
        console.log(req.params, ' ', req.body);
        const orderId = req.params.id;
        const productId = req.body.productId;
        const quantity = parseInt(req.body.quantity);
        const addProduct = await store.addProduct(quantity, orderId, productId);
        res.json(addProduct);
    }
    catch (err) {
        console.log(err);
        res.status(400);
        res.json(err);
    }
};
const orderRoutes = (app) => {
    app.get("/orders", user_1.verifyAuthToken, index);
    app.get("/orders/:id", user_1.verifyAuthToken, show);
    app.post("/orders", user_1.verifyAuthToken, create);
    app.post("/orders/:id/product", user_1.verifyAuthToken, addProduct);
};
exports.default = orderRoutes;
