const express = require('express');
const app = express();
const fornecedoresRoutes = require('./src/routes/fornecedoresRoutes');
const cors = require('cors');

const allowedOrigins = [
  'https://desafio-clarke-energia-fullstack.vercel.app',
  'https://genidocesbrigadeiros.web.app',  
  'http://localhost:4200',
  'http://localhost:8080'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());
app.use('/api/fornecedores', fornecedoresRoutes);

module.exports = app;
