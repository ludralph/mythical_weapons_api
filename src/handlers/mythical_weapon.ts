import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Weapon, MythicalWeaponStore } from "../models/mythical_weapon";
import { verifyAuthToken } from "./user";



const store = new MythicalWeaponStore();

const index = async (req: Request, res: Response) => {
  const weapons = await store.index();
  res.json(weapons);
};

const create = async (req: Request, res: Response) => {
	const weapon: Weapon = {
		name: req.body.name,
		type: req.body.type,
		weight: req.body.weight
	}

    try{
    	const weapons = await store.create(weapon);
    	res.json(weapons);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const mythical_weapon_routes = (app: express.Application) => {
  app.get("/mythical-weapons", verifyAuthToken, index);
  // app.get('/mythical-weapons/:id', show);
  app.post("/mythical-weapons", verifyAuthToken, create);
  // app.put('/mythical-weapons/:id',verifyAuthToken, update);
  // app.delete('/mythical-weapons/:id',verifyAuthToken, delete)
};

export default mythical_weapon_routes;
