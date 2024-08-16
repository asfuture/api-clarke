const mongoose = require('mongoose');

const fornecedoresSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    logo: { type: String, required: true },
    estado: { type: String, required: true },
    custo_kWh: { type: Number, required: true },
    limite_minimo_kWh: { type: Number, required: true },
    numero_total_clientes: { type: Number, required: true },
    avaliacao_media: { type: Number, required: true }
});

module.exports = mongoose.model('fornecedores', fornecedoresSchema);
