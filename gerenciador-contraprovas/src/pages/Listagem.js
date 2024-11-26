import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  Box,
} from '@mui/material';
import { styled } from '@mui/system';

// Estilização customizada
const StyledContainer = styled(Container)({
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
  padding: '2rem',
  marginTop: '2rem',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
  backgroundColor: '#3f51b5',
  color: '#fff',
});

const Listagem = () => {
  const [amostras, setAmostras] = useState([]);
  const [loading, setLoading] = useState(true);  // Adicionando estado de carregamento

  useEffect(() => {
    const fetchAmostras = async () => {
      try {
        const response = await api.get('/amostras');
        setAmostras(response.data);
      } catch (error) {
        console.error('Erro ao buscar amostras:', error);
      } finally {
        setLoading(false);  // Definindo como carregamento completo
      }
    };
    fetchAmostras();
  }, []);


  if (loading) {
    return <Typography variant="h6" color="primary">Carregando amostras...</Typography>;
  }

  // Excluir amostra
  const deleteAmostra = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta amostra?')) {
      try {
        await api.delete(`/amostras/${id}`);
        setAmostras(amostras.filter((amostra) => amostra.id !== id));
        alert('Amostra excluída com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir amostra:', error);
        alert('Erro ao excluir amostra.');
      }
    }
  };

  return (
    <StyledContainer>
      {/* Cabeçalho */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
        <img
          src="/path/to/icon.png" // Substitua pelo caminho correto do ícone
          alt="Ícone de listagem"
          style={{ width: '30px', height: '30px' }}
        />
        <Typography variant="h5" fontWeight="bold" color="#3f51b5">
          Listagem de Amostras
        </Typography>
      </Box>

      {/* Tabela */}
      <TableContainer component={Paper} sx={{ marginTop: '1rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Produto</StyledTableCell>
              <StyledTableCell>Lote</StyledTableCell>
              <StyledTableCell>Fabricação</StyledTableCell>
              <StyledTableCell>Validade</StyledTableCell>
              <StyledTableCell>Quantidade</StyledTableCell>
              <StyledTableCell>Responsável</StyledTableCell>
              <StyledTableCell>Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {amostras.map((amostra) => (
              <TableRow key={amostra.id}>
                <TableCell>{amostra.id}</TableCell>
                <TableCell>{amostra.nome_produto}</TableCell>
                <TableCell>{amostra.lote}</TableCell>
                <TableCell>{amostra.data_fabricacao}</TableCell>
                <TableCell>{amostra.data_validade}</TableCell>
                <TableCell>{amostra.quantidade}</TableCell>
                <TableCell>{amostra.responsavel}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteAmostra(amostra.id)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledContainer>
  );
};

export default Listagem;
