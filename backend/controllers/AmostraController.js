// backend/controllers/amostrasController.js
const AmostraModel = require('../models/amostraModel');
const pool = require('../config/database');

// Obter todas as amostras
const getAmostras = async (req, res) => {
    try {
      console.log('Buscando amostras no banco...');
      const result = await pool.query('SELECT id, produto AS nome_produto FROM amostras');
      console.log('Amostras retornadas:', result.rows);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Erro ao buscar amostras:', error.message);
      res.status(500).json({ message: 'Erro ao buscar amostras', error: error.message });
    }
  };
  


// Criar uma nova amostra
const createAmostra = async (req, res) => {
    const { produto, lote, data_fabricacao, data_validade, quantidade, unidade, responsavel } = req.body;

    // Validação básica dos dados
    if (!produto || !lote || !data_fabricacao || !data_validade || !quantidade || !unidade || !responsavel) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const result = await pool.query(
            `INSERT INTO amostras ( produto, lote, data_fabricacao, data_validade, quantidade, unidade, responsavel)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [produto, lote, data_fabricacao, data_validade, quantidade, unidade, responsavel]
        );

        console.log('Amostra criada:', result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao cadastrar amostra:', error);
        res.status(500).json({ message: 'Erro ao cadastrar amostra', error: error.message });
    }
};

// Excluir uma amostra por ID
const deleteAmostra = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await AmostraModel.deleteAmostra(id);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Amostra não encontrada' });
        }

        res.status(200).json({ message: 'Amostra excluída com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir amostra:', error);
        res.status(500).json({ message: 'Erro ao excluir amostra', error: error.message });
    }
};

// Listar amostras por produto (genérico)
const listarPorProduto = async (req, res) => {
    const { produto } = req.params;

    try {
        const result = await pool.query('SELECT * FROM amostras WHERE produto = $1', [produto]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: `Nenhuma amostra encontrada para o produto: ${produto}` });
        }

        res.status(200).json(result.rows);
    } catch (error) {
        console.error(`Erro ao listar amostras para o produto ${produto}:`, error);
        res.status(500).json({ message: 'Erro ao listar amostras', error: error.message });
    }
};

// Subtrair a quantidade solicitada
const solicitarAmostra = async (req, res) => {
    const { id } = req.params;
    const { quantidadeSolicitada } = req.body;

    // Verifica se a quantidade solicitada foi informada
    if (!quantidadeSolicitada || quantidadeSolicitada <= 0) {
        return res.status(400).json({ message: 'Quantidade solicitada inválida' });
    }

    try {
        // Verifica se a amostra existe
        const result = await pool.query('SELECT * FROM amostras WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Amostra não encontrada' });
        }

        const amostra = result.rows[0];

        // Verifica se a quantidade solicitada é maior que a disponível
        if (quantidadeSolicitada > amostra.quantidade) {
            return res.status(400).json({ message: 'Quantidade solicitada maior que a disponível' });
        }

        // Atualiza a quantidade no banco de dados
        const newQuantity = amostra.quantidade - quantidadeSolicitada;
        const updateResult = await pool.query(
            'UPDATE amostras SET quantidade = $1 WHERE id = $2 RETURNING *',
            [newQuantity, id]
        );

        res.status(200).json({
            message: 'Amostra solicitada com sucesso',
            amostra: updateResult.rows[0],
        });
    } catch (error) {
        console.error('Erro ao solicitar amostra:', error);
        res.status(500).json({ message: 'Erro ao solicitar amostra', error: error.message });
    }
};

module.exports = {
    getAmostras,
    createAmostra,
    deleteAmostra,
    listarPorProduto,
    solicitarAmostra, // Adicionando a função para solicitação de amostras
};
