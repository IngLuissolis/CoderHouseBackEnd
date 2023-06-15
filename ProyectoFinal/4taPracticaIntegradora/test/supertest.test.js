import supertest from 'supertest';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';

const request = supertest('http://localhost:3000');

let userTestRoleUser = {
    first_name: 'pedro',
    last_name: 'perez',
    email: 'pedroperez@gmail.com',
    password: '12345',
    role: 'user'
}

let userTestRoleAdmin = {
    first_name: 'juan',
    last_name: 'perez',
    email: 'juanperez@gmail.com',
    password: '12345',
    role: 'admin'
}

let userTestRolePremium = {
    first_name: 'Luis Eduardo',
    last_name: 'Solís',
    email: 'ingedusolis@gmail.com',
    password: '12345',
    role: 'premium'
}

const productTest1 = {
    nombre: 'uruguay',
    grupo: 'grupoF',
    precio: 20000
}

const productTest2 = {
    nombre: 'uruguay',
    grupo: 'grupoH',
    precio: 20000
}

const cartTest1 = {
    products: [
      { product: '6466b98cdb15b7b97cbbcfce', quantity: 2 },
      { product: '6466c4d065aa3fab3a5081c8', quantity: 1 }
    ]
  };

const cartTest2 = {
    products: [
      { product: '6466b98cdb15b7b97cbbcfce', quantity: 1 },
    ]
  };

const cartTest3 = {
    products: [
      { product: '6466b98cdb15b7b97cbbcfce', quantity: 5 },
      { product: '6466c4d065aa3fab3a5081c8', quantity: 11 }
    ]
  };

describe('Test Rutas Users', () => {

    // it('Test Metodo Post /users', async () => {
    //     const response = await request.post('/users')
    //         .send(userTestRoleUser);
    //     expect(response).to.have.property('ok', true);
    // })

    it('Test Metodo Get All Users /users', async () => {
        const response = await request.get('/users')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response).to.have.property('statusCode', 200);
    })

    it('Test Metodo Get User id /users/:id', async () => {
        const id = '6466967487ec472dd71fac98';
        const response = await request.get(`/users/${id}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response).to.have.property('statusCode', 200);
    })

    it('Test Metodo Post Login User Admin /users/login', async () => {
        const response = await request.post(`/users/login`)
            .send(userTestRoleAdmin);
        expect(response).to.have.property('statusCode', 200);
    })

})


describe('Test Rutas Products', () => {

    it('Test Metodo Get All Products /products', async () => {
        const response = await request.get('/products')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response).to.have.property('statusCode', 200);
    })

    it('Test Metodo Get Product id /product/:id', async () => {
        const id = '646d588f605e0188737fd008';
        const response = await request.get(`/products/${id}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response).to.have.property('statusCode', 200);
    })

    it('Test Metodo Post Product Authorize "Admin" /product/addProduct', async () => {
        userTestRoleAdmin = JSON.stringify(userTestRoleAdmin);

        const response = await request.post('/products/addProduct')
            .send(productTest1)
            .set('Cookie', [`user= ${userTestRoleAdmin}`]) // Establecer las cookies en la solicitud

        expect(response).to.have.property('statusCode', 200);
    })
})

describe('Test Rutas Carts', () => {

    it('Test Metodo Get All Carts /carts', async () => {
        const response = await request.get('/carts')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response).to.have.property('statusCode', 200);
    })

    it('Test Metodo Post Create Cart /carts', async () => {
        const response = await request.post('/carts')
            .send(cartTest1)
        expect(response).to.have.property('statusCode', 200);
    })

    it('Test Metodo Put Change Products in Cart /carts', async () => {
        const createCart = await request.post('/carts')
            .send(cartTest2)
        
        const id = createCart._body.cart._id;

        const response = await request.put(`/carts/${id}`)
            .send(cartTest3)
        expect(response).to.have.property('statusCode', 200);
        expect(cartTest2).to.not.deep.equal(cartTest3);
    })
})