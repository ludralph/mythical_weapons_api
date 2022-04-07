"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const user_1 = require("./user");
const store = new product_1.ProductStore();
const index = async (req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
};
const create = async (req, res) => {
    try {
        console.log(req.body);
        const product = {
            name: req.body.name,
            price: req.body.price,
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
};
const show = async (req, res) => {
    try {
        const product = await store.show(req.params.id);
        res.json(product);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const productRoutes = (app) => {
    app.get("/products", user_1.verifyAuthToken, index);
    app.get("/products/:id", user_1.verifyAuthToken, show);
    app.post("/products", user_1.verifyAuthToken, create);
};
exports.default = productRoutes;
