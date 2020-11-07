const app = require('../../src/app');
const supertest = require('supertest');
// const validation = require('validator');
const request = supertest(app);
const repository = require('../../src/repositories/customeRepository');
// const customerController = require('../../src/controllers/CustomerController');

describe('', () => {

  it('Deve retornar uma string JWT', async (done) => {

    const data = {
      email: 'brunosilva2365@gmail.com',
      password: 'teste@123'
    };

    await repository.post(data);

    const response = request.post('/auth').send(data);

    console.log(response);

    expect(response.status).toBe(200);

    done();

  });

});
