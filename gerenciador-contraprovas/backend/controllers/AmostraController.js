// backend/controllers/amostraController.js
const AmostraModel = require('../models/amostraModel');
const pool = require('../config/database'); // Importando o pool de conexões

// Função para obter todas as amostras
const getAmostras = async (req, res) => {
    try {
        const amostras = await AmostraModel.getAllAmostras();
        res.status(200).json(amostras);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar amostras', error: error.message });
    }
};

// Função para criar amostra
const createAmostra = async (req, res) => {
    console.log("Dados recebidos no backend:", req.body);
    const { produto, lote, data_fabricacao, data_validade, quantidade, unidade, responsavel } = req.body;

    try {
        // Inserindo a amostra no banco de dados
        const result = await pool.query(
            `INSERT INTO amostras (produto, lote, data_fabricacao, data_validade, quantidade, unidade, responsavel)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [produto, lote, data_fabricacao, data_validade, quantidade, unidade, responsavel]
        );

        console.log('Resultado da inserção:', result.rows[0]);  // Adicionando log para verificar o que é retornado
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao cadastrar amostra:', error);
        res.status(500).json({ message: 'Erro ao cadastrar amostra', error: error.message });
    }
};

// Função para excluir uma amostra
const deleteAmostra = async (req, res) => {
    try {
        const { id } = req.params;
        await AmostraModel.deleteAmostra(id);
        res.status(200).json({ message: 'Amostra excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir amostra', error: error.message });
    }
};

// Funções para filtrar amostras NL50 e N50
const listarNL50 = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM amostras WHERE nome_produto = $1', ['NL50']);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar amostras NL50', error: error.message });
    }
};

const listarN50 = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM amostras WHERE nome_produto = $1', ['N50']);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar amostras N50', error: error.message });
    }
};

module.exports = { getAmostras, createAmostra, deleteAmostra, listarNL50, listarN50 };
