
# TCC-Search 

Este repositorio contém um sistema para gerenciar os TCCs do DCC (Departamento de Ciência da Computação). Foi desenvolvido para a matéria: Projeto e Implementação de Sistemas. 
## Funcionalidades 

- Registro e Login de Usuários.
- Visualização de TCCs.
- Pesquisas de TCCs por Filtros. 
- Cadastro, Edição, Remoção de Tccs. (Apenas para Admins)
## Tecnologias utilizadas

- Frontend: Nextjs, Tailwindcss.
- Backend: Nodejs.
- Banco de Dados: SQlite.
- Dependências: mui icons, daisyui, prisma, jwtdecode, bcrypt, npm.
## Pré-requisitos

- Node.js (versão 14+)
- npm (versão 10+)
- Prisma (versão 3+)
## Configuração do Projeto

Para rodar a aplicação, rode os seguintes comandos nesta ordem 

### 1. Clone o Repositório

```bash
  git clone https://github.com/KylixXD/tcc_search.git 
```

### 2. mude o Repositório
```bash
  cd tcc-search
```

### 3. Instale todas as dependências
```bash
  npm install ou yarn install
```
## Configuração do Banco de Dados

O projeto usa o SQLite como banco de dados padrão.


### 4. Crie um Arquivo ".env" na raiz do projeto  (se ainda não  existir). Adicione a URL de conexão do banco de dados no arquivo .env:

```bash
DATABASE_URL="file:./dev.db"
```

### 5. Inicialize o cliente Prisma
Execute o seguinte comando para gerar o cliente Prisma:

```bash
npx prisma generate
```
### 6. Aplicando as Migrações
```bash
npx prisma migrate dev --name init
```
Esse comando vai criar o banco de dados dev.db na raiz do projeto (ou em outra localização, conforme especificado na variável DATABASE_URL) e aplicar as migrações necessárias para criar as tabelas.

### 7. Iniciando a Aplicação
```bash
npm run dev ou yarn dev
```
### 8. A aplicação estará disponível em:

```bash
http://localhost:3000
```
## Melhorias Futuras

- [ ]  Cadastro de TCCs em Lote;
- [ ]  Pesquisa por tags os TCCs;



