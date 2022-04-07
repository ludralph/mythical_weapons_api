import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";
import { verifyAuthToken } from "./user";

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const productRoutes = (app: express.Application) => {
  app.get("/products", verifyAuthToken, index);
  app.get("/products/:id", verifyAuthToken, show);
  app.post("/products", verifyAuthToken, create);
};

export default productRoutes;
