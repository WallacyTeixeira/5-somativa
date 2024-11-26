## Documentação: Semana 3 - Sprint 2  
**Objetivo:** Desenvolver as principais funcionalidades da aplicação.  

---

### **Objetivos da Sprint**  
1. Implementar funcionalidades essenciais que atendam ao problema identificado.  
2. Integrar a aplicação com o banco de dados e APIs para garantir funcionalidades robustas.  
3. Realizar testes iniciais para detecção e correção de bugs.  
4. Refinar a interface com base no feedback coletado na Sprint 1.  
5. Entregar um protótipo funcional com as funcionalidades principais implementadas.  

---

### **Atividades Realizadas**  

#### **1. Implementação das Funcionalidades Essenciais**
- Desenvolvimento das operações **CRUD (Create, Read, Update, Delete)** para gerenciar os dados do sistema.  
- Configuração e integração da aplicação com o banco de dados **PostgreSQL**:  
  - Configuração do Pool de conexões utilizando o módulo `pg`.  
  - Criação de tabelas e ajustes nos esquemas de dados conforme as necessidades do sistema.  
- Desenvolvimento das APIs para comunicação entre o frontend e o backend:  
  - Rotas configuradas no backend utilizando Express.  
  - Controle de erros e retorno de respostas adequadas para o cliente.  

#### **2. Testes Iniciais**
- Realização de testes de funcionalidade para validação do CRUD:  
  - Testes de criação, leitura, atualização e exclusão de registros no banco de dados.  
  - Validação do fluxo completo de envio e recepção de dados entre o frontend e o backend.  
- Correção de erros encontrados durante os testes:  
  - Problemas relacionados a mapeamento de campos na tabela do banco de dados.  
  - Ajuste nos nomes das colunas para correspondência entre o banco e o modelo do backend.  

#### **3. Refinamento da Interface**
- Ajustes e melhorias na interface baseando-se no feedback da Sprint 1:  
  - Adição de validação nos formulários de cadastro no frontend.  
  - Melhorias no layout e organização dos componentes.  
  - Implementação de feedbacks visuais para ações do usuário (ex.: mensagens de sucesso ou erro).  

#### **4. Resultados Obtidos**
- Protótipo funcional entregue com:  
  - CRUD operacional, integrado ao banco de dados PostgreSQL.  
  - Comunicação eficiente entre frontend e backend via APIs REST.  
  - Interface refinada com melhorias de usabilidade.  

---

### **Dificuldades Enfrentadas**  
1. **Erros de Conexão com o Banco de Dados:**  
   - Solução: Revisão dos caminhos de importação e configuração adequada do arquivo `database.js`.  

2. **Inconsistência no Mapeamento de Campos:**  
   - Solução: Ajuste do nome de colunas no banco de dados para alinhar com as convenções de nomenclatura no código.  

3. **Falhas em Testes Iniciais:**  
   - Solução: Correções de bugs encontrados durante o teste do CRUD e revalidação do fluxo completo.

---

### **Próximos Passos**
1. Realizar testes mais abrangentes para validação do sistema em cenários diversos.  
2. Adicionar tratamento de erros avançado e mensagens mais descritivas no backend.  
3. Implementar mais funcionalidades com base no roadmap.  
4. Continuar refinando a interface com foco em acessibilidade e responsividade.  

**Entrega Esperada:** Protótipo funcional pronto para avaliação interna.
