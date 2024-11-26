### **Semana 2: Sprint 1 - Design e Início da Implementação**

---

#### **Objetivo**  
Estruturar o design e iniciar a implementação das funcionalidades essenciais do projeto, garantindo a base sólida para o desenvolvimento futuro.

---

### **1. Definição da Arquitetura**
Optamos por utilizar a arquitetura **MVC (Model-View-Controller)** para organizar o projeto devido às suas vantagens:

#### **Motivos para a Escolha da Arquitetura MVC**  
1. **Separação de responsabilidades**:  
   - Facilita o desenvolvimento paralelo, permitindo que diferentes equipes trabalhem na camada de visualização, lógica de negócios e manipulação de dados de forma independente.

2. **Facilidade de manutenção**:  
   - Alterações em uma camada não afetam diretamente as demais, reduzindo o risco de bugs e aumentando a agilidade na implementação de mudanças.

3. **Escalabilidade**:  
   - A organização modular torna o projeto mais escalável, suportando o crescimento de funcionalidades e novas demandas com facilidade.

4. **Reutilização de código**:  
   - Componentes como modelos e controladores podem ser reutilizados em outras partes do sistema, economizando tempo de desenvolvimento.

#### **Como Isso Ajudará no Desenvolvimento**  
- **Frontend (View)**: React será utilizado para a interface do usuário, promovendo componentes reutilizáveis e integração com o backend.  
- **Backend (Controller e Model)**: Node.js com Express e PostgreSQL será utilizado para a lógica de negócios e armazenamento de dados.  
- **Comunicação**: Através de APIs RESTful, garantindo integração fluida entre as camadas.

---

### **2. Configuração do Ambiente de Desenvolvimento**

#### **Ferramentas Escolhidas**  
1. **Visual Studio Code (VS Code)**  
   - **Vantagens**:  
     - Interface amigável e personalizável.  
     - Extensões como ESLint e Prettier para garantir qualidade do código.  
     - Suporte para integração com sistemas de controle de versão (Git/GitHub).  
   - **Configuração**:  
     - Baixe e instale o VS Code do site oficial.  
     - Instale extensões importantes, como:
       - **ESLint**: Para identificar problemas de código em tempo real.
       - **Prettier**: Para formatação automática de código.  
       - **React Developer Tools**: Para depuração de aplicações React.

2. **React**  
   - **Vantagens**:  
     - Facilita a criação de interfaces dinâmicas e responsivas.  
     - Reutilização de componentes para acelerar o desenvolvimento.  
     - Comunidade ativa e grande quantidade de bibliotecas disponíveis.  
   - **Configuração**:  
     - Instale o Node.js e o gerenciador de pacotes npm.  
     - Configure o ambiente React:
       ```bash
       npx create-react-app projeto-contraprovas
       cd projeto-contraprovas
       npm start
       ```

3. **PostgreSQL**  
   - **Vantagens**:  
     - Banco de dados robusto, seguro e escalável.  
     - Suporte para manipulação de dados complexos e compatibilidade com ferramentas modernas.  
   - **Configuração**:  
     - Baixe o PostgreSQL e configure o banco:
       ```sql
       CREATE DATABASE contraprovas;
       CREATE USER app_user WITH PASSWORD 'senha_segura';
       GRANT ALL PRIVILEGES ON DATABASE contraprovas TO app_user;
       ```
     - Integre com o backend utilizando a biblioteca `pg`.

---

### **3. Desenvolvimento Inicial: Estrutura de Navegação e Interfaces Principais**

#### **Explicação Geral**
Nesta etapa, o foco é criar as funcionalidades essenciais que serão a base da aplicação, incluindo:

1. **Estrutura de Navegação**:  
   - Utilização do **React Router** para implementar uma navegação fluida e eficiente entre as páginas da aplicação.  
   - Configuração inicial inclui páginas como **Dashboard**, **Cadastro**, **Listagem de Amostras** e **Relatórios**.

2. **Interfaces Principais**:  
   - Criação das primeiras telas:
     - **Dashboard**: Exibe resumos como total de amostras registradas e alertas de amostras vencidas.  
     - **Cadastro de Amostras**: Formulário para adicionar novas contraprovas.  
     - **Listagem de Amostras**: Tabela interativa com dados das contraprovas, incluindo edição e exclusão.  
     - **Relatórios e Auditorias**: Página inicial para geração de relatórios (funcionalidade futura).

#### **Objetivos**
- Apresentar as interfaces ao professor e receber feedback para ajustes.
- Garantir que a navegação entre páginas funcione de maneira fluida e intuitiva.

---

### **Entrega ao Final da Semana**
1. **Definição e documentação da arquitetura MVC.**  
2. **Ambiente de desenvolvimento configurado e documentado.**  
3. **Estrutura de navegação implementada e primeiras telas desenvolvidas.**  
4. **Preparação para ajustes e conexão com backend na próxima etapa.**
