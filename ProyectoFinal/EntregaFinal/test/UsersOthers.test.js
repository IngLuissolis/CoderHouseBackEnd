import { expect } from "chai";
import UsersDBDTO from "../src/persistence/DTO/usersDTO/usersDB.dto.js";
import {hashPassword, comparePassword } from './../src/utils.js';

describe('Testear funcionalidades de bcrypt', () => {

    const userTest = {
        first_name: 'juan',
        last_name: 'perez',
        email: 'juanperez@gmail.com',
        password: '12345'
    }

    it('Probar que contraseña hasheada sea diferente a contraseña ingresada por el usuario', async () => {
        const Passwordhasheada = await hashPassword(userTest.password);
        //
        expect(Passwordhasheada).to.not.equal(userTest.password);
    })

    it('Probar que la contraseña hasheada coincide con la del usuario', async () => {
        const Passwordhasheada = await hashPassword(userTest.password);
        const result = await comparePassword(userTest.password, Passwordhasheada);
        //
        expect(result).to.be.true;
    })
})