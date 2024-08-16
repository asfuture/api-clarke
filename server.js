'use strict';

const http = require('http');
const debug = require('debug')('api:server');
const app = require('./app');
const connectToDatabase = require('./src/repository/config/mongoose'); // Atualize o caminho se necessário

const port = normalizePort(process.env.PORT || '3000');
const server = http.createServer(app);

async function startServer() {
    try {
        await connectToDatabase(); // Conectar ao banco de dados
        console.log('Connected to MongoDB');
        
        server.listen(port, '0.0.0.0'); // Garantir que o servidor escute em todas as interfaces de rede
        server.on('error', onError);
        server.on('listening', onListening);
        console.log('API Rodando na porta ' + port);
    } catch (err) {
        console.error('Error starting the server:', err);
    }
}

startServer();

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
