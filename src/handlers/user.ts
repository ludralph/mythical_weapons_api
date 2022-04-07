import express, { request, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { User, UserStore } from "../models/user";

const store = new UserStore();

const index = async (req:Request, res: Response) => {
  const users = await store.index();
  res.json(users);
}

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
}

const create = async (req: Request, res: Response) => {
	const user: User = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
		const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password: req.body.password
  }
  try {
		const authenticatedUser = await store.authenticate(req.body.username, req.body.password);
    const token = jwt.sign({user: authenticatedUser }, process.env.TOKEN_SECRET);
		res.json(token)
	} catch (error) {
    console.log('auth ',error)
		res.status(401);
		res.json({ error })
	}
}

export const verifyAuthToken = (req:Request, res: Response, next ) => {
  try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader?.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        next();
    } catch (error) {
      console.log('KK ', error)
        res.status(401)
        res.json({ error});
    }

}

const user_routes = (app: express.Application) => {
 app.get("/users", index);
  app.get("/users/:id", show)
  app.post("/users", create);
	app.post('/login',verifyAuthToken, authenticate);
};

export default user_routes;
