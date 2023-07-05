import './db.js';
import usersModel from '../src/persistence/DAO/usersDAO/usersMongo.js';
// Modulo nativo para validación de test
import { expect } from 'chai';

describe('Testing de Users dao para mongoDB', () => {

    //Test Metodo findAll()
    it('Debe Retornar todos los usuarios de la base de datos', async () => {
        const result = await usersModel.findAll();
        //
        expect(Array.isArray(result)).to.be.equal(true);
    })

    //Test Metodo create()
    it('Debe agregar un usuario a la base de datos', async () => {
        const userTest = {
            first_name: 'john',
            last_name: 'doe',
            email: 'john@example.com',
            password: '12345'
        }

        const result = await usersModel.create(userTest);
        //
        expect(result).to.have.property('_id');
    })
})