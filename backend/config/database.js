// backend/config/database.js
const { Pool } = require('pg');

// Configuração do Pool de conexões com o banco de dados
const pool = new Pool({
  user: 'postgres',         // Seu usuário PostgreSQL
  host: 'localhost',        // Endereço do servidor (localhost, se estiver local)
  database: 'gerenciador_contraprovas',  // Nome do banco de dados
  password: '1234',        // Sua senha do banco
  port: 5432,               // Porta padrão do PostgreSQL
});

module.exports = pool;
