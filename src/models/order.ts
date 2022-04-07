// @ts-ignore
import client from "../database";
import { Product } from "./product";

export type Order = {
  id?: string;
  status: string;
  userId: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = `SELECT * FROM orders`;
      const result = await conn.query(sql);
      conn.release();
      
      return result.rows;
    } catch (err) {
        console.log(err);
        
      throw new Error(`unable to get orders ${err} `);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE id = ($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`could not find order with id ${id}, ${error} `);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *";
      //@ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [order.status, order.userId]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not add new order ${order}, ${error}`);
    }
  }

  async addProduct(quantity: number, orderId: string, productId: string) : Promise<Order>{
    try {
        // @ts-ignore
        const conn = await client.connect();
        const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1,$2,$3) RETURNING *';

        const result = await conn.query(sql, [orderId, productId, quantity]);

        conn.release();

        return result.rows[0];
    } catch (err) {
        throw new Error(`could not add product ${productId} to order ${orderId}: ${err}`)
    }
  }
}
