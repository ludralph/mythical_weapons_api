"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mythical_weapon_1 = __importDefault(require("./handlers/mythical_weapon"));
const orders_1 = __importDefault(require("./handlers/orders"));
const product_1 = __importDefault(require("./handlers/product"));
const user_1 = __importDefault(require("./handlers/user"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
const PORT = process.env.PORT;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
(0, mythical_weapon_1.default)(app);
(0, user_1.default)(app);
(0, orders_1.default)(app);
(0, product_1.default)(app);
console.log('ENVIRONMENT VAR ', process.env);
app.listen(PORT || 3000, function () {
    console.log(`starting app on: ${address}`);
});
