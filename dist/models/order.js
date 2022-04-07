"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM orders`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            console.log(err);
            throw new Error(`unable to get orders ${err} `);
        }
    }
    async show(id) {
        try {
            const sql = "SELECT * FROM orders WHERE id = ($1)";
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`could not find order with id ${id}, ${error} `);
        }
    }
    async create(order) {
        try {
            const sql = "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *";
            //@ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [order.status, order.userId]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`could not add new order ${order}, ${error}`);
        }
    }
    async addProduct(quantity, orderId, productId) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1,$2,$3) RETURNING *';
            const result = await conn.query(sql, [orderId, productId, quantity]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`could not add product ${productId} to order ${orderId}: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
