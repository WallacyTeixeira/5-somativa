// backend/models/Requisicao.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://user:pass@localhost:5432/dbname'); // Ajuste sua conexão

const Requisicao = sequelize.define('Requisicao', {
  // Defina os campos do seu modelo
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Requisicao;
