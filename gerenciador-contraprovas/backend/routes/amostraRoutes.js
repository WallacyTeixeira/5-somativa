const express = require('express');
const router = express.Router();
const amostraController = require('../controllers/AmostraController');

router.get('/', amostraController.getAmostras);
router.post('/', amostraController.createAmostra);
router.delete('/:id', amostraController.deleteAmostra);

router.get('/nl50', amostraController.listarNL50);
router.get('/n50', amostraController.listarN50);

module.exports = router;
