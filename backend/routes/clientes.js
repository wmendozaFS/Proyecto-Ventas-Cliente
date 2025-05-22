const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
router.get('/', clientesController.getAll);
router.post('/', clientesController.create);
module.exports = router;