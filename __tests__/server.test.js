const request = require('supertest');
const http = require('http');
const app = require('../app');
const connectToDatabase = require('../src/repository/config/mongoose'); // Atualize o caminho se necessário

jest.mock('http');
jest.mock('../src/repository/config/mongoose'); // Mock do módulo de conexão com o banco de dados

describe('Server Initialization', () => {
  let server;

  beforeAll(async () => {
    await connectToDatabase.mockResolvedValue(); // Simula a conexão bem-sucedida com o banco de dados

    server = http.createServer(app);
    server.listen.mockImplementation(() => {
      server.emit('listening');
    });
  });

  it('Deve iniciar o servidor e conectar ao banco de dados', async () => {
    const startServer = require('../server');
    expect(connectToDatabase).toHaveBeenCalled();
    expect(server.listen).toHaveBeenCalledWith(expect.any(Number), '0.0.0.0');
  });

  it('Deve retornar 200 na rota /api/fornecedores', async () => {
    const res = await request(app).get('/api/fornecedores');
    expect(res.status).toBe(200);
  });

  it('Deve retornar 404 para rotas inexistentes', async () => {
    const res = await request(app).get('/nonexistent-route');
    expect(res.status).toBe(404);
  });

  it('Deve emitir um erro ao tentar usar uma porta em uso', async () => {
    const error = new Error('EADDRINUSE');
    error.syscall = 'listen';
    error.code = 'EADDRINUSE';

    const onError = jest.fn();
    server.on('error', onError);
    server.emit('error', error);

    expect(onError).toHaveBeenCalledWith(error);
  });

  afterAll(() => {
    jest.resetModules(); // Limpa os mocks após os testes
  });
});
