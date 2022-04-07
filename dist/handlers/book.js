"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = require("../models/book");
const store = new book_1.BookStore();
const index = async (req, res) => {
    try {
        const books = await store.index();
        res.json(books);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const create = async (req, res) => {
    try {
        const book = {
            title: req.body.title,
            author: req.body.author,
            totalPages: req.body.totalPages,
            type: req.body.type,
            summary: req.body.summary,
        };
        const newBook = await store.create(book);
        res.json(newBook);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const show = async (req, res) => {
    try {
        const book = await store.show(req.params.id);
        res.json(book);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const update = async (req, res) => {
    const updatedBook = await store.update(req.params.id, req.body.title, req.body.author);
    res.json(updatedBook);
};
const destroy = async (req, res) => {
    const deletedBook = await store.delete(req.params.id);
    res.json(deletedBook);
};
const book_routes = (app) => {
    app.get("/books", index);
    app.get('/books/:id', show);
    app.post("/books", create);
    app.put('/books/:id', update);
    app.delete('/books/:id', destroy);
};
exports.default = book_routes;
