import bcrypt from "bcrypt";
import client from "../database";

export type User = {
  username: string;
  password: string;
};

const pepper = process.env.BCRYPT_PASSWORD;

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      console.log(result)
      return result.rows;
    } catch (error) {
      throw new Error(`could not get users ${error}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id = ($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`could not find user with id ${id}, ${error} `);
    }
  }

  async create(user: User): Promise<User> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      // const saltRounds = process.env.SALT_ROUNDS;

      const sql =
        "INSERT INTO users (username,password_digest) VALUES ($1, $2) RETURNING *";
      const hash = bcrypt.hashSync(user.password + pepper, parseInt("10"));
      const result = await conn.query(sql, [user.username, hash]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to create user ${user.username}:  ${error}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    //@ts-ignore
    const conn = await client.connect();
    const sql = "SELECT password_digest FROM users where username = ($1)";
    const result = await conn.query(sql, [username]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }
    return null;
  }
}
