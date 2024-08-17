const repository = require("../repository/fornecedoresRepository")

exports.getFornecedoresService = async (body) => {
    return await repository.find();
}

exports.getFornecedoresServiceId = async (id) => {
    return await repository.findById(id);
}

exports.postFornecedoresService = async (fornecedorData) => {
    return await repository.create(fornecedorData)
}
