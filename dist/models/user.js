"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
const pepper = process.env.BCRYPT_PASSWORD;
class UserStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM users";
            const result = await conn.query(sql);
            conn.release();
            console.log(result);
            return result.rows;
        }
        catch (error) {
            throw new Error(`could not get users ${error}`);
        }
    }
    async show(id) {
        try {
            const sql = "SELECT * FROM users WHERE id = ($1)";
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`could not find user with id ${id}, ${error} `);
        }
    }
    async create(user) {
        try {
            const conn = await database_1.default.connect();
            // const saltRounds = process.env.SALT_ROUNDS;
            const sql = "INSERT INTO users (username,password_digest) VALUES ($1, $2) RETURNING *";
            const hash = bcrypt_1.default.hashSync(user.password + pepper, parseInt("10"));
            const result = await conn.query(sql, [user.username, hash]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`unable to create user ${user.username}:  ${error}`);
        }
    }
    async authenticate(username, password) {
        const conn = await database_1.default.connect();
        const sql = "SELECT password_digest FROM users where username = ($1)";
        const result = await conn.query(sql, [username]);
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(password + pepper, user.password_digest)) {
                return user;
            }
        }
        return null;
    }
}
exports.UserStore = UserStore;
