import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";
import { verifyAuthToken } from "./user";

const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (error) {
		console.log('kk ', error)
    res.status(400);
    res.send(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
		console.log(req.body)
    const order: Order = {
      status: req.body.status,
      userId: req.body.userId,
    };
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (error) {
		console.log(error)
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
		console.log(req.params , ' ' , req.body)
    const orderId = req.params.id;
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity);
    const addProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addProduct);
  } catch (err) {
		console.log(err)
    res.status(400);
    res.json(err);
  }
};



const orderRoutes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.get("/orders/:id", verifyAuthToken, show);
  app.post("/orders", verifyAuthToken, create);
  app.post("/orders/:id/product", verifyAuthToken, addProduct);
};

export default orderRoutes;
