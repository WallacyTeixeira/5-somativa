// backend/routes/amostraRoutes.js
const express = require('express');
const router = express.Router();
const amostraController = require('../controllers/AmostraController');
const { Requisicao } = require('./models');

// Rotas de amostras
router.get('/listagem', amostraController.getAmostras); // Nova rota explícita
router.post('/', amostraController.createAmostra);
router.delete('/:id', amostraController.deleteAmostra);

// Endpoint para listar todas as requisições
router.get('/requisicoes', async (req, res) => {
    try {
      const requisicoes = await Requisicao.findAll(); // Altere para a lógica do seu modelo
      res.json(requisicoes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar requisições' });
    }
  });
  
module.exports = router;
