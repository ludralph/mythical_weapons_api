"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MythicalWeaponStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class MythicalWeaponStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM mythical_weapons";
            const res = await conn.query(sql);
            return res.rows;
        }
        catch (err) {
            throw new Error(`could not connect fetch data from the db ${err}`);
        }
    }
    async create(weapon) {
        const conn = await database_1.default.connect();
        const text = "INSERT INTO mythical_weapons(name, type, weight) VALUES($1, $2, $3) RETURNING *";
        const values = [weapon.name, weapon.type, weapon.weight];
        const res = await conn.query(text, values);
        console.log(res.rows[0]);
        return res.rows[0];
    }
}
exports.MythicalWeaponStore = MythicalWeaponStore;
