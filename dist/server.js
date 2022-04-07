"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var mythical_weapon_1 = __importDefault(require("./handlers/mythical_weapon"));
var orders_1 = __importDefault(require("./handlers/orders"));
var product_1 = __importDefault(require("./handlers/product"));
var user_1 = __importDefault(require("./handlers/user"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use((0, cors_1["default"])());
app.use(body_parser_1["default"].json());
(0, mythical_weapon_1["default"])(app);
(0, user_1["default"])(app);
(0, orders_1["default"])(app);
(0, product_1["default"])(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
