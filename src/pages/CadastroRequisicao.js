import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Assumindo que você tenha a configuração de API

const CadastroRequisicao = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    produto: '',
    lote: '',
    data: '',
    quantidade: '',
    unidade: '',
    responsavel: '',
  });
  const [produtos, setProdutos] = useState([]);  // Estado para armazenar os produtos
  const [loading, setLoading] = useState(true);  // Estado de loading enquanto carrega os produtos

  // Função para buscar produtos já cadastrados
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get('/produtos'); // Supondo que a API tenha um endpoint para listar os produtos
        setProdutos(response.data); // Atualiza o estado com os produtos
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false); // Finaliza o loading após a busca
      }
    };
    fetchProdutos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.produto || !form.lote || !form.data || !form.quantidade || !form.responsavel) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    try {
      const response = await api.post('/requisicoes', form); // Supondo que a URL de cadastro seja '/requisicoes'
      console.log('Resposta do backend:', response.data);
      alert('Requisição cadastrada com sucesso!');
      setForm({
        produto: '',
        lote: '',
        data: '',
        quantidade: '',
        unidade: 'mg',
        responsavel: '',
      });
    } catch (error) {
      console.error('Erro ao cadastrar:', error.response || error.message);
      alert('Erro ao cadastrar');
    }
  };

  return (
    <Container sx={{ backgroundColor: '#f0f0f0', borderRadius: '8px', padding: '2rem', maxWidth: '600px', marginTop: '2rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
        <Typography variant="h5" fontWeight="bold" color="#3f51b5">
          Cadastro de Requisição
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Campo Produto com Select */}
        <FormControl fullWidth required>
          <InputLabel id="produto-label">Produto</InputLabel>
          <Select
            labelId="produto-label"
            name="produto"
            value={form.produto}
            onChange={handleChange}
            label="Produto"
          >
            {loading ? (
              <MenuItem disabled>Carregando...</MenuItem>
            ) : (
              produtos.map((produto) => (
                <MenuItem key={produto.id} value={produto.id}>
                  {produto.nome} {/* Supondo que o campo de nome do produto seja 'nome' */}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        <TextField
          name="lote"
          label="Lote"
          value={form.lote}
          onChange={handleChange}
          required
        />
        <TextField
          name="data"
          label="Data Requisição"
          type="date"
          value={form.data}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField
            name="quantidade"
            label="Quantidade"
            type="number"
            value={form.quantidade}
            onChange={handleChange}
            required
            sx={{ flex: 2 }}
          />
          <FormControl sx={{ flex: 1 }}>
            <TextField
              name="unidade"
              label="Unidade"
              value={form.unidade}
              onChange={handleChange}
              required
            />
          </FormControl>
        </Box>

        <TextField
          name="responsavel"
          label="Responsável"
          value={form.responsavel}
          onChange={handleChange}
          required
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/requisicoes')} // Redireciona para a lista de requisições
          >
            Voltar
          </Button>
          <Button
            variant="contained"
            sx={{ borderRadius: '30px', backgroundColor: '#3f51b5', '&:hover': { backgroundColor: '#303f9f' } }}
            type="submit"
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CadastroRequisicao;
