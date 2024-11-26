const pool = require('../config/db');

// Obter todas as amostras
const getAmostras = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM amostras ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Criar uma nova amostra
const createAmostra = async (req, res) => {
  const { nome_produto, lote, data_fabricacao, data_validade, quantidade, responsavel } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO amostras (nome_produto, lote, data_fabricacao, data_validade, quantidade, responsavel) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nome_produto, lote, data_fabricacao, data_validade, quantidade, responsavel]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar uma amostra
const updateAmostra = async (req, res) => {
  const { id } = req.params;
  const { nome_produto, lote, data_fabricacao, data_validade, quantidade, responsavel } = req.body;

  try {
    const result = await pool.query(
      'UPDATE amostras SET nome_produto = $1, lote = $2, data_fabricacao = $3, data_validade = $4, quantidade = $5, responsavel = $6 WHERE id = $7 RETURNING *',
      [nome_produto, lote, data_fabricacao, data_validade, quantidade, responsavel, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Excluir uma amostra
const deleteAmostra = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM amostras WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const listarNL50 = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM amostras WHERE tipo = $1', ['NL50']);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar amostras NL50' });
    }
  };
  
  const listarN50 = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM amostras WHERE tipo = $1', ['N50']);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar amostras N50' });
    }
  };
  

module.exports = {
  getAmostras,
  createAmostra,
  updateAmostra,
  deleteAmostra,
  cadastrarAmostra,
  listarAmostras,
  removerAmostra,
  listarNL50,
  listarN50,
};
