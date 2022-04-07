// @ts-ignore
import client from "../database";

export type Product = {
  id?: string;
  name: string;
  price: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
			// @ts-ignore
      const conn = await client.connect();
      const sql = `SELECT * FROM products`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable to get products ${err} `);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id = ($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`could not find product with id ${id}, ${error} `);
    }
  }

  async create(product: Product ): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *";
      //@ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [product.name, product.price]);
			conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not add new product ${product.name}, ${error}`);
    }
  }
}
