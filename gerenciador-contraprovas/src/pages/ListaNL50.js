import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Listagem from './Listagem';
import { Button, Box } from '@mui/material';

const ListaNL50 = () => {
  const [amostras, setAmostras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAmostras = async () => {
      try {
        const response = await api.get('/amostras');
        const nl50Amostras = response.data.filter((amostra) => amostra.nome_produto === 'NL-50');
        setAmostras(nl50Amostras);
      } catch (error) {
        console.error('Erro ao buscar amostras:', error);
      }
    };

    fetchAmostras();
  }, []);

  const deleteAmostra = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta amostra?')) {
      try {
        await api.delete(`/amostras/${id}`);
        setAmostras(amostras.filter((amostra) => amostra.id !== id));
        alert('Amostra excluída com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir amostra:', error);
      }
    }
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/cadastro')}
        >
          Cadastrar Amostra
        </Button>
      </Box>
      <Listagem amostras={amostras} deleteAmostra={deleteAmostra} />
    </Box>
  );
};

export default ListaNL50;
