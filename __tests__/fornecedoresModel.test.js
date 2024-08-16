const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Fornecedor = require('../src/model/fornecedoresModel'); // Verifique se o caminho está correto

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

describe('Fornecedor Model Test', () => {
  it('Deve criar e salvar um fornecedor corretamente', async () => {
    const fornecedorData = {
      nome: 'Fornecedor Teste',
      logo: 'logo.png',
      estado: 'SP',
      custo_kWh: 0.5,
      limite_minimo_kWh: 100,
      numero_total_clientes: 200,
      avaliacao_media: 4.5
    };
    const fornecedor = new Fornecedor(fornecedorData);
    const savedFornecedor = await fornecedor.save();

    expect(savedFornecedor._id).toBeDefined();
    expect(savedFornecedor.nome).toBe(fornecedorData.nome);
    expect(savedFornecedor.logo).toBe(fornecedorData.logo);
    expect(savedFornecedor.estado).toBe(fornecedorData.estado);
    expect(savedFornecedor.custo_kWh).toBe(fornecedorData.custo_kWh);
    expect(savedFornecedor.limite_minimo_kWh).toBe(fornecedorData.limite_minimo_kWh);
    expect(savedFornecedor.numero_total_clientes).toBe(fornecedorData.numero_total_clientes);
    expect(savedFornecedor.avaliacao_media).toBe(fornecedorData.avaliacao_media);
  });

  it('Deve falhar ao criar um fornecedor sem campos obrigatórios', async () => {
    const fornecedorData = {
      nome: 'Fornecedor Teste'
      // Outros campos faltando
    };
    const fornecedor = new Fornecedor(fornecedorData);
    let err;

    try {
      await fornecedor.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.logo).toBeDefined();
    expect(err.errors.estado).toBeDefined();
    expect(err.errors.custo_kWh).toBeDefined();
    expect(err.errors.limite_minimo_kWh).toBeDefined();
    expect(err.errors.numero_total_clientes).toBeDefined();
    expect(err.errors.avaliacao_media).toBeDefined();
  });

  it('Deve falhar ao criar um fornecedor com tipos de dados inválidos', async () => {
    const fornecedorData = {
      nome: 'Fornecedor Teste',
      logo: 'logo.png',
      estado: 'SP',
      custo_kWh: 'invalid',
      limite_minimo_kWh: 'invalid',
      numero_total_clientes: 'invalid',
      avaliacao_media: 'invalid'
    };
    const fornecedor = new Fornecedor(fornecedorData);
    let err;

    try {
      await fornecedor.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.custo_kWh).toBeDefined();
    expect(err.errors.limite_minimo_kWh).toBeDefined();
    expect(err.errors.numero_total_clientes).toBeDefined();
    expect(err.errors.avaliacao_media).toBeDefined();
  });
});
