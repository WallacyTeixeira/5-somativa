// src/pages/Cadastro.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, FormControl } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CustomContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
  padding: '2rem',
  maxWidth: '600px',
  marginTop: '2rem',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

const StyledButton = styled(Button)({
  borderRadius: '30px',
  backgroundColor: '#3f51b5',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#303f9f',
  },
});

const Cadastro = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    produto: '',
    lote: '',
    data_fabricacao: '',
    data_validade: '',
    quantidade: '',
    unidade: '',
    responsavel: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.produto || !form.lote || !form.data_fabricacao || !form.data_validade || !form.quantidade || !form.responsavel) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    try {
      const response = await api.post('/amostras', form);
      console.log('Resposta do backend:', response.data);
      alert('Amostra cadastrada com sucesso!');
      setForm({
        produto: '',
        lote: '',
        data_fabricacao: '',
        data_validade: '',
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
    <CustomContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
        
        <Typography variant="h5" fontWeight="bold" color="#3f51b5">
          Cadastro
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth>
          <TextField
            name="produto"
            label="Produto"
            value={form.produto}
            onChange={handleChange}
            required
          />
        </FormControl>

        <TextField
          name="lote"
          label="Lote"
          value={form.lote}
          onChange={handleChange}
          required
        />
        <TextField
          name="data_fabricacao"
          label="Data de Produção"
          type="date"
          value={form.data_fabricacao}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          name="data_validade"
          label="Data de Validade"
          type="date"
          value={form.data_validade}
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
            onClick={() => navigate('/')}
          >
            Voltar
          </Button>
          <StyledButton type="submit" variant="contained">
            Salvar
          </StyledButton>
        </Box>
      </Box>
    </CustomContainer>
  );
};

export default Cadastro;
