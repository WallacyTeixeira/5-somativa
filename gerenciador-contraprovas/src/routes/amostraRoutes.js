const express = require('express');
const AmostraController = require('../controllers/amostraController');

const router = express.Router();

router.get('/', AmostraController.getAmostras);
router.post('/', AmostraController.createAmostra);
router.delete('/:id', AmostraController.deleteAmostra);

module.exports = router;
