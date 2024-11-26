import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/system';
import api from '../services/api'; // Certifique-se de que o caminho esteja correto

// Estilização personalizada para o container
const CustomContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
  padding: '2rem',
  maxWidth: '600px',
  marginTop: '2rem',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

// Botão estilizado
const StyledButton = styled(Button)({
  borderRadius: '30px',
  backgroundColor: '#3f51b5',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#303f9f',
  },
});

const Cadastro = () => {
  const [form, setForm] = useState({
    produto: '',
    lote: '',
    data_fabricacao: '',
    data_validade: '',
    quantidade: '',
    unidade: 'mg', // Unidade padrão
    responsavel: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validando se todos os campos estão preenchidos corretamente
    if (!form.produto || !form.lote || !form.data_fabricacao || !form.data_validade || !form.quantidade || !form.responsavel) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    try {
        const response = await api.post('/amostras', form);
        console.log('Resposta do backend:', response.data);  // Verifique se a resposta está sendo retornada corretamente
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
        <img
          src="/path/to/icon.png" // Substitua pelo caminho correto do ícone
          alt="Ícone de cadastro"
          style={{ width: '30px', height: '30px' }}
        />
        <Typography variant="h5" fontWeight="bold" color="#3f51b5">
          Cadastro e Coleta de Amostras
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Campo de seleção para produto */}
        <FormControl required fullWidth>
          <InputLabel id="produto-label">Produto</InputLabel>
          <Select
            labelId="produto-label"
            name="produto"
            value={form.produto}
            onChange={handleSelectChange}
          >
            <MenuItem value="NL-50">NL-50</MenuItem>
            <MenuItem value="N-50">N-50</MenuItem>
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

        {/* Campo de quantidade com unidade */}
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
            <Select
              name="unidade"
              value={form.unidade}
              onChange={handleSelectChange}
            >
              <MenuItem value="ml">ml</MenuItem>
              <MenuItem value="g">g</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TextField
          name="responsavel"
          label="Responsável"
          value={form.responsavel}
          onChange={handleChange}
          required
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <StyledButton type="submit" variant="contained">
            Salvar
          </StyledButton>
        </Box>
      </Box>
    </CustomContainer>
  );
};

export default Cadastro;
