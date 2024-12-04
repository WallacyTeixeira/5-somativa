//src/pages/Requisicoes.js
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
  Container,
  TablePagination,
  Button,
  TextField,
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

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

const Requisicoes = () => {
  const [requisicoes, setRequisicoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequisicoes = async () => {
      try {
        const response = await api.get('/requisicoes');
        setRequisicoes(response.data);
      } catch (error) {
        console.error('Erro ao buscar requisições:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequisicoes();
  }, []);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRequisicoes = requisicoes.filter((requisicao) =>
    requisicao.produto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Typography variant="h6">Carregando requisições...</Typography>;
  }

  return (
    <StyledContainer>
      <Typography variant="h5" fontWeight="bold" color="#3f51b5" gutterBottom>
        Lista de Requisições
      </Typography>

      {/* Botão para cadastro de requisição */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/cadastro-requisicao')}
        sx={{ marginBottom: '1rem' }}
      >
        Cadastrar Requisição
      </Button>

      {/* Campo de busca */}
      <TextField
        fullWidth
        label="Buscar por Produto"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
        margin="normal"
      />

      {/* Mensagem de lista vazia */}
      {filteredRequisicoes.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          Nenhuma requisição encontrada.
        </Typography>
      ) : (
        <>
          {/* Tabela */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Produto</StyledTableCell>
                  <StyledTableCell>Quantidade</StyledTableCell>
                  <StyledTableCell>Solicitante</StyledTableCell>
                  <StyledTableCell>Data</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRequisicoes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((requisicao) => (
                  <TableRow key={requisicao.id}>
                    <TableCell>{requisicao.id}</TableCell>
                    <TableCell>{requisicao.produto}</TableCell>
                    <TableCell>{requisicao.quantidade}</TableCell>
                    <TableCell>{requisicao.solicitante}</TableCell>
                    <TableCell>{new Date(requisicao.data).toLocaleDateString('pt-BR')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginação */}
          <TablePagination
            component="div"
            count={filteredRequisicoes.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </StyledContainer>
  );
};

export default Requisicoes;
