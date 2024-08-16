// __tests__/fornecedores.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Fornecedor = require('../src/model/fornecedoresModel');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let uri;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  uri = mongoServer.getUri();
  
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
}, 10000);

describe('Fornecedores API', () => {
  jest.setTimeout(10000); // Tempo limite aumentado para 10 segundos

  let fornecedorId;

  beforeEach(async () => {
    const fornecedor = new Fornecedor({
      nome: 'Fornecedor Teste',
      logo: 'logo.png',
      estado: 'SP',
      custo_kWh: 0.5,
      limite_minimo_kWh: 100,
      numero_total_clientes: 200,
      avaliacao_media: 4.5
    });
    const savedFornecedor = await fornecedor.save();
    fornecedorId = savedFornecedor._id;
  });

  afterEach(async () => {
    await Fornecedor.deleteMany();
  }, 10000);

  it('Deve obter todos os fornecedores', async () => {
    const res = await request(app).get('/api/fornecedores');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('nome', 'Fornecedor Teste');
  });

  it('Deve criar um novo fornecedor', async () => {
    const newFornecedor = {
      nome: 'Novo Fornecedor',
      logo: 'logo_novo.png',
      estado: 'RJ',
      custo_kWh: 0.6,
      limite_minimo_kWh: 200,
      numero_total_clientes: 300,
      avaliacao_media: 4.0
    };

    const res = await request(app)
      .post('/api/fornecedores')
      .send(newFornecedor);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('nome', 'Novo Fornecedor');
  });

  it('Deve falhar ao criar um fornecedor com dados inválidos', async () => {
    const newFornecedor = {
      nome: 'Fornecedor Inválido'
      // Dados faltando
    };

    const res = await request(app)
      .post('/api/fornecedores')
      .send(newFornecedor);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
  });
});
