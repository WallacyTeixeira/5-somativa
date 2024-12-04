// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const amostraRoutes = require('./routes/amostraRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const routes = require('./routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Use JSON para as requisições
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
app.use('/amostras', amostraRoutes);
app.use('/usuarios', usuarioRoutes);
app.use(express.json());

app.use('/api', routes)



app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
const pool = require('./config/database'); // ou o arquivo que você está usando

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erro na conexão com o banco de dados', err.stack);
    } else {
        console.log('Banco de dados conectado com sucesso!', res.rows);
    }
});
