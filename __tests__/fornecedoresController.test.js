const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const fornecedoresController = require('../src/controllers/fornecedoresController');
const Fornecedor = require('../src/model/fornecedoresModel');

// Crie uma instância do aplicativo Express para os testes
const app = express();
app.use(express.json());
app.get('/api/fornecedores', fornecedoresController.getFornecedores);
app.post('/api/fornecedores', fornecedoresController.createFornecedor);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri(); // Use um banco de dados de teste
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close(); // Fechar conexão com o banco de dados
  await mongoServer.stop();
}, 10000); // Aumenta o tempo limite para 10 segundos

describe('Fornecedor Controller Tests', () => {
  it('Deve obter todos os fornecedores', async () => {
    const fornecedorData = {
      nome: 'Fornecedor Teste',
      logo: 'logo.png',
      estado: 'SP',
      custo_kWh: 0.5,
      limite_minimo_kWh: 100,
      numero_total_clientes: 200,
      avaliacao_media: 4.5
    };
    await new Fornecedor(fornecedorData).save(); // Salva um fornecedor para o teste

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
    const invalidFornecedor = {
      nome: 'Fornecedor Inválido'
      // Dados faltando
    };

    const res = await request(app)
      .post('/api/fornecedores')
      .send(invalidFornecedor);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message');
  });
});
