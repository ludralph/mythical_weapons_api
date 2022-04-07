// @ts-ignore
import client from "../database";

export type Weapon = {
  name: string;
  type: string;
  weight: number;
};

export class MythicalWeaponStore {
  async index(): Promise<Weapon[]> {
    try{
      // @ts-ignore
      const conn = await client.connect(); 
      const sql = "SELECT * FROM mythical_weapons";
      const res = await conn.query(sql);
      return res.rows;
    }
    catch (err){
      throw new Error(`could not connect fetch data from the db ${err}`)
    }
    
  }

  async create(weapon : Weapon) {
  
    const conn = await client.connect();

    const text = "INSERT INTO mythical_weapons(name, type, weight) VALUES($1, $2, $3) RETURNING *";
    const values = [weapon.name, weapon.type, weapon.weight];
    const res = await conn.query(text, values);
    console.log(res.rows[0]);
    return res.rows[0];
  }
}
