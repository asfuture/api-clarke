const Fornecedores = require("../model/fornecedoresModel")

exports.find = async () => {
    return await Fornecedores.find();
}

exports.findById = async (id) => {
    return await Fornecedores.findById(id);
}

exports.create = async (fornecedorData) => {
    return await Fornecedores.create(fornecedorData);
}
