"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM products`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`unable to get products ${err} `);
        }
    }
    async show(id) {
        try {
            const sql = "SELECT * FROM products WHERE id = ($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`could not find product with id ${id}, ${error} `);
        }
    }
    async create(product) {
        try {
            const sql = "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [product.name, product.price]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`could not add new product ${product.name}, ${error}`);
        }
    }
}
exports.ProductStore = ProductStore;
