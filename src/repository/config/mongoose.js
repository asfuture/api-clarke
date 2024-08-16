const mongoose = require('mongoose');

const password = encodeURIComponent('123456clark');
const uri = `mongodb+srv://admin:${password}@genidoces.mqztirw.mongodb.net/genidoces?retryWrites=true&w=majority&appName=genidoces`;

async function connectToDatabase() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: { version: '1' },
            connectTimeoutMS: 20000, // Aumentar o tempo limite de conexão
            socketTimeoutMS: 45000 // Aumentar o tempo limite do socket
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        throw err;
    }
}

module.exports = connectToDatabase;
