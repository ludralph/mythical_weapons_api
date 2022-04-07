"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { Host, Database, POSTGRES_TEST_DB, User, Password, NODE_ENV, DATABASE_URL } = process.env;
let client;
if (NODE_ENV === "production") {
    const connectionString = DATABASE_URL;
    client = new pg_1.Pool({
        connectionString,
    });
}
else if (NODE_ENV === "development") {
    client = new pg_1.Pool({
        host: Host,
        database: Database,
        user: User,
        password: Password,
    });
}
else {
    client = new pg_1.Pool({
        host: Host,
        database: POSTGRES_TEST_DB,
        user: User,
        password: Password,
    });
}
exports.default = client;
