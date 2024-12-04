// src/pages/Listagem.js
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
  TablePagination,
  TextField, // Campo de texto para busca
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

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

// Função para formatar datas
const formatarData = (data) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Intl.DateTimeFormat('pt-BR', options).format(new Date(data));
};

const Listagem = () => {
  const navigate = useNavigate();
  const [amostras, setAmostras] = useState([]);
  const [filteredAmostras, setFilteredAmostras] = useState([]); // Amostras filtradas
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState(''); // Termo de busca

  useEffect(() => {
    const fetchAmostras = async () => {
      try {
        const response = await api.get('/amostras');
        setAmostras(response.data);
        setFilteredAmostras(response.data); // Inicialmente, todas as amostras são exibidas
      } catch (error) {
        console.error('Erro ao buscar amostras:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAmostras();
  }, []);

  // Atualizar filtro ao alterar o termo de busca
  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = amostras.filter((amostra) => {
      const nomeProduto = amostra.produto?.toLowerCase() || ''; // Garante que nome_produto seja uma string
      const responsavel = amostra.responsavel?.toLowerCase() || '';  // Garante que responsavel seja uma string
      return (
        nomeProduto.includes(lowercasedSearchTerm) ||
        responsavel.includes(lowercasedSearchTerm)
      );
    });
    setFilteredAmostras(filtered);
  }, [searchTerm, amostras]);
  

  const deleteAmostra = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta amostra?')) {
      setLoadingDelete(id);
      try {
        await api.delete(`/amostras/${id}`);
        setAmostras(amostras.filter((amostra) => amostra.id !== id));
        alert('Amostra excluída com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir amostra:', error);
        alert('Erro ao excluir amostra.');
      } finally {
        setLoadingDelete(false);
      }
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return <Typography variant="h6" color="primary">Carregando amostras...</Typography>;
  }

  return (
    <StyledContainer>
            {/* Cabeçalho */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          
          <Typography variant="h5" fontWeight="bold" color="#3f51b5">
            Listagem de Amostras
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem' }}> {/* Container para os botões */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/cadastro')} // Redireciona para a página de cadastro
          >
            Novo Cadastro
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/cadastro-requisicao')} // Redireciona para a página de requisição
          >
            Nova Requisição
          </Button>
        </Box>
      </Box>


      {/* Campo de busca */}
      <TextField
        fullWidth
        variant="outlined"
        label="Buscar por Produto ou Responsável"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: '1rem' }}
      />

      {/* Mensagem para lista vazia */}
      {filteredAmostras.length === 0 ? (
        <Typography variant="h6" color="textSecondary" sx={{ textAlign: 'center', marginTop: '1rem' }}>
          Nenhuma amostra encontrada.
        </Typography>
      ) : (
        <>
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
                {filteredAmostras.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((amostra) => (
                  <TableRow key={amostra.id}>
                    <TableCell>{amostra.id}</TableCell>
                    <TableCell>{amostra.produto}</TableCell>
                    <TableCell>{amostra.lote}</TableCell>
                    <TableCell>{formatarData(amostra.data_fabricacao)}</TableCell>
                    <TableCell>{formatarData(amostra.data_validade)}</TableCell>
                    <TableCell>{amostra.quantidade}</TableCell>
                    <TableCell>{amostra.responsavel}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteAmostra(amostra.id)}
                        disabled={loadingDelete === amostra.id}
                      >
                        {loadingDelete === amostra.id ? 'Excluindo...' : 'Excluir'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginação */}
          <TablePagination
            component="div"
            count={filteredAmostras.length}
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

export default Listagem;
