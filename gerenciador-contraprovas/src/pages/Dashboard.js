import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/system';

// Estilo para o container principal
const CustomContainer = styled(Container)({
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    padding: '2rem',
    maxWidth: '600px',
    marginTop: '2rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
});

// Estilo para os botões
const StyledButton = styled(Button)({
    backgroundColor: '#3f51b5',
    color: '#fff',
    borderRadius: '30px',
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    margin: '0 10px',
    '&:hover': {
        backgroundColor: '#303f9f',
    },
});

const Dashboard = () => {
    return (
        <CustomContainer>
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

            {/* Subtítulo */}
            <Typography variant="h6" gutterBottom>
                AMOSTRAS DISPONÍVEIS
            </Typography>

            {/* Botões de navegação */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '1rem' }}>
                <StyledButton component={Link} to="/lista-n50">
                    N-50
                </StyledButton>
                <StyledButton component={Link} to="/lista-nl50">
                    NL-50
                </StyledButton>
                <StyledButton component={Link} to="/listagem">
                    Lista Completa
                </StyledButton>
            </Box>
        </CustomContainer>
    );
};

export default Dashboard;
