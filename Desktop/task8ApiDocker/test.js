// test.js
const request = require('supertest');
const { startServer, app } = require('./index.js'); // Импортируйте startServer и app из вашего файла index.js

beforeAll(async () => {
  await startServer(); // Запускаем сервер перед началом тестирования
});

afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});

describe('GraphQL', () => {
  it('Returns weather for city', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({ query: '{ getWeatherByCityName(city: "Almaty") { temperature description } }' })
      .expect(200)
    
    expect(response.body.data.getWeatherByCityName).toHaveProperty('temperature');
    expect(response.body.data.getWeatherByCityName).toHaveProperty('description');
  });
});
