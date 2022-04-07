"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mythical_weapon_1 = require("../mythical_weapon");
const store = new mythical_weapon_1.MythicalWeaponStore();
describe('Mythical Weapon Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('index should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });
});
