// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Cadastro from './pages/Cadastro';
import Listagem from './pages/Listagem';
import Relatorios from './pages/Relatorios';
import Requisicoes from './pages/Requisicoes';
import CadastroRequisicao from './pages/CadastroRequisicao';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/listagem" element={<Listagem />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/requisicoes" element={<Requisicoes />} />
        <Route path="/cadastro-requisicao" element={<CadastroRequisicao/>} />
      </Routes>
    </Router>
  );
};

export default App;
