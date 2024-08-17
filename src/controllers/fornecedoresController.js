const fornecedoresService = require('../services/fornecedoresService');

exports.getFornecedores = async (req, res, next) => {
    try {
        const fornecedores = await fornecedoresService.getFornecedoresService();
        res.status(200).json(fornecedores);
    } catch (erro) {
        return next(erro);
    }
};

exports.getFornecedorById = async (req, res, next) => {
    try {
        const fornecedor = await fornecedoresService.getFornecedoresServiceId(req.params.id);
        res.status(200).json(fornecedor);
    } catch (erro) {
        return next(erro);
    }
};

exports.createFornecedor = async (req, res, next) => {
    try {
        const novoFornecedor = await fornecedoresService.postFornecedoresService(req.body);
        res.status(201).json(novoFornecedor);
    } catch (erro) {
        return next(erro);
    }
};
