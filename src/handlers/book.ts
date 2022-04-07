import express, { Request, Response } from "express";
import { Book, BookStore } from "../models/book";

const store = new BookStore();

const index = async (req: Request, res: Response) => {
  try {
		const books = await store.index();
    res.json(books);
	} catch (error) {
		res.status(400);
		res.json(error);
	}
};

const create = async (req: Request, res: Response) => {
  try {
    const book: Book = {
        title: req.body.title,
        author: req.body.author,
  			totalPages: req.body.totalPages,
  			type: req.body.type,
  			summary: req.body.summary,
    }
    const newBook = await store.create(book);
    res.json(newBook);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
	try {
		const book = await store.show(req.params.id);
    res.json(book);
	} catch (error) {
		res.status(400);
		res.json(error)
	}
}

const update = async (req: Request, res: Response) => {
	const updatedBook = await store.update(req.params.id, req.body.title, req.body.author);
	res.json(updatedBook);
}

const destroy = async (req: Request, res: Response) => {
	const deletedBook = await store.delete(req.params.id);
	res.json(deletedBook)
}

const book_routes = (app: express.Application) => {
  app.get("/books", index);
  app.get('/books/:id', show);
  app.post("/books", create);
  app.put('/books/:id', update);
  app.delete('/books/:id', destroy)
};

export default book_routes;
