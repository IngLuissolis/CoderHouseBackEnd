import './db.js';
import usersModel from '../src/persistence/DAO/usersDAO/usersMongo.js';
// Modulo nativo para validación de test
import assert from 'assert';

describe('Testing de Users dao para mongoDB', () => {

    before(() => {
        //this.usersDao = new usersModel(); //crear instancia
    })

    // beforeEach( function () {
    //     this.timeout = 5000; //5seg
    // })

    //Test Metodo findAll()
    it('Debe Retornar todos los usuarios de la base de datos', async () => {
        const result = await usersModel.findAll();
        //
        assert.notEqual(Array.isArray(result), false);
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
        assert.ok(result._id);
    })
})