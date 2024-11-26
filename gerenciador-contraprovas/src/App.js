import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ListaNL50 from './pages/ListaNL50';
import ListaN50 from './pages/ListaN50';
import Cadastro from './pages/Cadastro';
import Listagem from './pages/Listagem';
import Relatorios from './pages/Relatorios';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/listagem" element={<Listagem />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/lista-nl50" element={<ListaNL50 />} />
        <Route path="/lista-n50" element={<ListaN50 />} />
      </Routes>
    </Router>
  );
};

export default App;
