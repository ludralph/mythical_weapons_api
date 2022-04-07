import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import mythical_weapon_routes from "./handlers/mythical_weapon";
import orderRoutes from "./handlers/orders";
import productRoutes from "./handlers/product";
import user_routes from "./handlers/user";



const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(cors());

app.use(bodyParser.json());

mythical_weapon_routes(app);
user_routes(app);
orderRoutes(app);
productRoutes(app);


app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
