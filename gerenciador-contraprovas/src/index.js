import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CssBaseline } from '@mui/material'; // Reseta estilos básicos
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Configuração do tema
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Azul padrão
    },
    secondary: {
      main: '#ff4081', // Rosa padrão
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
