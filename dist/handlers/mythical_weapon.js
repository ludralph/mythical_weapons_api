"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mythical_weapon_1 = require("../models/mythical_weapon");
const user_1 = require("./user");
const store = new mythical_weapon_1.MythicalWeaponStore();
const index = async (req, res) => {
    const weapons = await store.index();
    res.json(weapons);
};
const create = async (req, res) => {
    const weapon = {
        name: req.body.name,
        type: req.body.type,
        weight: req.body.weight
    };
    try {
        const weapons = await store.create(weapon);
        res.json(weapons);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const mythical_weapon_routes = (app) => {
    app.get("/mythical-weapons", user_1.verifyAuthToken, index);
    // app.get('/mythical-weapons/:id', show);
    app.post("/mythical-weapons", user_1.verifyAuthToken, create);
    // app.put('/mythical-weapons/:id',verifyAuthToken, update);
    // app.delete('/mythical-weapons/:id',verifyAuthToken, delete)
};
exports.default = mythical_weapon_routes;
