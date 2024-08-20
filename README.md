## Backend - API RESTful  - Fornecedores
### Visão Geral
Este projeto consiste em uma API para fornecedores de energia limpa, que oferece operações do verbo HTTP ( GET, POST, UPDATE e DELETE ). 
Esta API faz conexão com o banco de dados Nosql MongoDB.
### A API está hospedado no vercel e pode ser acessada por este link:
- https://api-clarke-ten.vercel.app/api/fornecedores
### Base de dados no MongoDB
- nome
- logo
- estado de origem
- custo por kWh
- limite mínimo de kWh
- número total de clientes
- avaliação média dos clientes
## Tecnologia Utilizadas
- Node.js 21.6.1
- Express 4.19.2
- Cors ^2.8.5
- Nodemon ^3.1.4
- Mongoose ^6.8.0
- Postman para testes de API
## Arquitetura e Boas praticas
- MVC
- SOLID
- CLEAN CODE
 ## Passos para Rodar o Projeto Localmente
  ### Clone o Repositório
- Clone o repositório do GitHub para o seu ambiente local:
```bash
git clone https://github.com/asfuture/api-clarke.git
cd api-clarke
```
### Instale as Dependências
- Após clonar o repositório, instale as dependências necessárias com o npm:

```bash
npm install
```
### Inicie o Servidor
- Inicie o servidor Node.js com o comando:
```bash
npm start
```
- Se preferir usar nodemon para desenvolvimento (que reinicia automaticamente o servidor ao detectar mudanças no código), use:
```bash
npm run dev
```
### Teste a API
- A API estará disponível em http://localhost:3000/api/fornecedores. Você pode testar as rotas usando ferramentas como Postman ou curl.

### Executando Testes

- Para executar os testes unitários, utilize o comando:

```bash
npm test
```
## Autor: Alex Ferreira
<div>
<a href="https://www.linkedin.com/in/alexferreira-asfuture/" target="_blank">
  <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
</a>
<a href="https://www.youtube.com/@alexferreiraasfuture214" target="_blank">
  <img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" />
</a>
 
