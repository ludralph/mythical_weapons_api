"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const store = new user_1.UserStore();
const tokenSecret = String(process.env.TOKEN_SECRET);
const index = async (req, res) => {
    const users = await store.index();
    res.json(users);
};
const show = async (req, res) => {
    try {
        const user = await store.show(req.params.id);
        res.json(user);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const create = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, tokenSecret);
        res.json(token);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const authenticate = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    };
    try {
        const authenticatedUser = await store.authenticate(req.body.username, req.body.password);
        const token = jsonwebtoken_1.default.sign({ user: authenticatedUser }, tokenSecret);
        res.json(token);
    }
    catch (error) {
        console.log('auth ', error);
        res.status(401);
        res.json({ error });
    }
};
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = String(authorizationHeader?.split(' ')[1]);
        const decoded = jsonwebtoken_1.default.verify(token, tokenSecret);
        next();
    }
    catch (error) {
        console.log('KK ', error);
        res.status(401);
        res.json({ error });
    }
};
exports.verifyAuthToken = verifyAuthToken;
const user_routes = (app) => {
    app.get("/users", index);
    app.get("/users/:id", show);
    app.post("/users", create);
    app.post('/login', exports.verifyAuthToken, authenticate);
};
exports.default = user_routes;
