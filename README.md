#  FocusList - Frontend  

## Preview da Aplicação

<p align="center">
  <img src="./src/assets/img/preview 1.png" width="250"/>
  <img src="./src/assets/img/preview 2.png" width="250"/>
  <img src="./src/assets/img/preview 3.png" width="250"/>

</p>

##  Demonstração

[ Clique para assistir](https://drive.google.com/file/d/1HY4AHO0QCB9Fpoy7Ix8FKHz-AwBWUDwH/view?usp=drive_link)

![Vue 3](https://img.shields.io/badge/Vue.js-3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Pinia](https://img.shields.io/badge/Pinia-State%20Manager-FADA5E?style=for-the-badge)

O **FocusList Frontend** é a interface web da aplicação FocusList, desenvolvida para ajudar usuários a organizarem suas tarefas e aumentarem sua produtividade através de um sistema moderno, rápido e intuitivo.

---

##  Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Stack Tecnológico](#-stack-tecnológico)
- [Funcionalidades](#-funcionalidades)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Scripts](#-scripts)
- [Estrutura do Projeto](#-estrutura-do-projeto)

---

##  Sobre o Projeto

O frontend do FocusList foi desenvolvido utilizando Vue 3 com Vite, garantindo alta performance e uma excelente experiência de usuário.

A aplicação consome uma API REST própria para autenticação e gerenciamento de tarefas, com sistema de login via JWT.

---

## 🛠 Stack Tecnológico

### Core
- **[Vue 3](https://vuejs.org/)**
- **[Vite](https://vitejs.dev/)**
- **JavaScript (ES6+)**

### Gerenciamento de Estado & Dados
- **[Pinia](https://pinia.vuejs.org/)**
- **[Axios](https://axios-http.com/)**

### Navegação
- **Vue Router**

---

##  Funcionalidades

-  Autenticação de usuários (login/cadastro)
-  Listagem de tarefas
-  Criação de tarefas
-  Edição de tarefas
-  Remoção de tarefas
-  Dashboard básico de produtividade
-  Persistência com API

---

##  Pré-requisitos

- Node.js (18+ recomendado)
- npm

---

##  Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/FocusList-Frontend.git

2.  **Acesse a pasta do projeto:**
    ```bash
    cd cd FocusList-Frontend
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configuração de Ambiente (.env):**
    Crie um arquivo `.env` na raiz e configure a URL da sua API:
    ```env
    VITE_API_URL=http://localhost:3000
    ```

---

##  Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento local (HMR ativado). |
| `npm run build` | Transpila o código para produção na pasta `dist`. |
| `npm run lint` | Executa o ESLint para verificar a qualidade do código. |
| `npm run preview` | Simula o build de produção localmente. |

---

##  Estrutura do Projeto

A estrutura de pastas segue o padrão sugerido pelo Vite:

```bash
FocusList-Frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── router/
│   ├── services/
│   ├── stores/
│   ├── App.vue
│   └── main.js
├── package.json
├── vite.config.js
└── index.html