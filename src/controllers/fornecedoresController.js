const Fornecedor = require('../model/fornecedoresModel');

exports.getFornecedores = async (req, res) => {
    console.log("Recebida solicitação para obter fornecedores");
    try {
        const fornecedores = await Fornecedor.find();
        console.log("Fornecedores encontrados:", fornecedores);
        res.status(200).json(fornecedores);
    } catch (err) {
        console.error("Erro ao obter fornecedores:", err);
        res.status(500).json({ message: err.message });
    }
};

exports.createFornecedor = async (req, res) => {
    console.log("Recebida solicitação para criar um novo fornecedor");
    const fornecedor = new Fornecedor(req.body);
    try {
        const novoFornecedor = await fornecedor.save();
        console.log("Fornecedor criado:", novoFornecedor);
        res.status(201).json(novoFornecedor);
    } catch (err) {
        console.error("Erro ao criar fornecedor:", err);
        res.status(400).json({ message: err.message });
    }
};
