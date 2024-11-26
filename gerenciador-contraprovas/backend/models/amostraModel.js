const pool = require('../config/database');

// Função para buscar todas as amostras
const getAllAmostras = async () => {
  try {
    const result = await pool.query('SELECT * FROM amostras');
    return result.rows;  // Retorna as amostras do banco
  } catch (error) {
    console.error('Erro ao buscar amostras', error);
    throw error; // Lança o erro para ser tratado no controller
  }
};

const createAmostra = async (amostra) => {
    const { produto, lote, data_fabricacao, data_validade, quantidade, unidade, responsavel } = amostra;
    
    try {
      const result = await pool.query(
        'INSERT INTO amostras (produto, lote, data_fabricacao, data_validade, quantidade, unidade, responsavel) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [produto, lote, data_fabricacao, data_validade, quantidade, unidade, responsavel]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Erro ao cadastrar amostra no banco:", error.message);
      throw error;  // Propaga o erro para o controlador
    }
  };

// Função para excluir uma amostra
const deleteAmostra = async (id) => {
  try {
    await pool.query('DELETE FROM amostras WHERE id = $1', [id]);
  } catch (error) {
    console.error('Erro ao excluir amostra', error);
    throw error; // Lança o erro para ser tratado no controller
  }
};

module.exports = { getAllAmostras, createAmostra, deleteAmostra };
