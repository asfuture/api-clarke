const express = require('express');
const router = express.Router();
const fornecedoresController = require('../controllers/fornecedoresController');

router.get('/', fornecedoresController.getFornecedores);
router.get('/:id', fornecedoresController.getFornecedorById);
router.post('/', fornecedoresController.createFornecedor);



module.exports = router;
