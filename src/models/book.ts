//@ts-ignore
import client from "../database";

export type Book = {
  title: string;
  author: string;
  totalPages: number;
  type: string;
  summary: string;
};

export class BookStore {
  async index(): Promise<Book[]> {
    try {
			const conn = await client.connect();
			const sql  = 'SELECT * FROM books';
			const result = await conn.query(sql);
			conn.release();
			return result.rows;

    } catch (error) {
			throw new Error(`could not get books ${ error }`);
			
		}
  }

	async show (id: string): Promise<Book> {
		try {
			const sql = 'SELECT * FROM books WHERE id = ($1)';
			
			const conn = await client.connect();

			const result  = await conn.query(sql, [id]);

			conn.release();

			return result.rows[0];

		} catch (error) {
			throw new Error(`could not find book with id ${id}, ${ error } `);
			
		}
	}

	async create (b: Book): Promise<Book> {
		try {
			const sql = 'INSERT INTO books (title, author, total_pages, type, summary) VALUES ($1, $2, $3, $4, $5) RETURNING *';
			
			const conn = await client.connect();
			const result = await conn.query(sql, [b.title, b.author, b.totalPages, b.type, b.summary]);
			const book = result.rows[0];
			conn.release();
			return book
		} catch (error) {
			throw new Error(`could not add new book ${b.title}, ${error}`)
		}
	}

	async delete (id: string): Promise<Book> {
		try {
			const sql = 'DELETE FROM books WHERE id = ($1) RETURNING *';
			//@ts-ignore
			const conn = await client.connect();
			const result = await conn.query(sql, [id]);
			const book = result.rows[0];
			conn.release();
			return book;
		} catch (error) {
			throw new Error(`Could not delete book with id, Error ${error}`);
		}
	}

	async update (id: string, title: string, author: string): Promise<Book> {
		try {
			const sql = 'UPDATE books SET title = ($1), author = ($2) WHERE id = ($3) RETURNING *';
			
			const conn = await client.connect();
			const result = await conn.query(sql, [title, author, id]);
			
			const book = result.rows[0];
			conn.release()
			return book;
		} catch (error) {
			throw new Error(`Could not update book of id ${id}, Error ${error}`);
			
		}
	}
}
