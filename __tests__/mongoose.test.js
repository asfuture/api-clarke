const mongoose = require('mongoose');
const connectToDatabase = require('../src/repository/config/mongoose');

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('Database Connection', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve conectar ao MongoDB com sucesso', async () => {
    mongoose.connect.mockResolvedValueOnce({});

    await connectToDatabase();

    expect(mongoose.connect).toHaveBeenCalledTimes(1);
    expect(mongoose.connect).toHaveBeenCalledWith(
      expect.stringContaining('mongodb+srv://admin:'),
      expect.objectContaining({
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: { version: '1' },
        connectTimeoutMS: 20000,
        socketTimeoutMS: 45000,
      })
    );
  });

  it('Deve lançar um erro quando a conexão falhar', async () => {
    const errorMessage = 'Failed to connect';
    mongoose.connect.mockRejectedValueOnce(new Error(errorMessage));

    await expect(connectToDatabase()).rejects.toThrow(errorMessage);

    expect(mongoose.connect).toHaveBeenCalledTimes(1);
  });
});
