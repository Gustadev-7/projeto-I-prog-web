# Sistema de Gerenciamento de Concessionária

API REST para gerenciamento de uma concessionária de veículos, desenvolvida como Projeto II da disciplina de Programação para Web do curso de Análise e Desenvolvimento de Sistemas.

**Professor:** Anisio Alfredo da Silva Junior

## Alunos/Desenvolvedores

<table>
  <tr>
    <td align="center"><sub><b>Caroline Inacio Campos</b></sub></td>
    <td align="center"><sub><b>Gabriel Demichelli da Silva</b></sub></td>
    <td align="center"><sub><b>Gustavo de Souza Domingos</b></sub></td>
  </tr>
</table>

---

## Tecnologias Utilizadas

| Tecnologia | Descrição |
|---|---|
| **Node.js** | Ambiente de execução JavaScript |
| **Express** | Framework para construção da API REST |
| **TypeScript** | Tipagem estática sobre JavaScript |
| **MySQL** | Banco de dados relacional |
| **mysql2** | Driver Node.js para conexão com MySQL |
| **ts-node** | Execução de TypeScript sem compilação prévia |

---

## Arquitetura

O projeto segue o padrão **MVC** organizado em camadas:

```
src/
├── model/          # Classes de domínio (Cliente, Carro, Vendedor, Estoque, NotaFiscal)
├── repositories/   # Acesso ao banco de dados (SQL via mysql2)
├── services/       # Regras de negócio
├── controllers/    # Recebem requisições HTTP e delegam aos services
├── routes/         # Definição das rotas (router.ts)
├── database/       # Conexão e inicialização do MySQL (mysql.ts)
└── app.ts          # Ponto de entrada da aplicação
```

---

## Pré-requisitos

- Node.js instalado
- MySQL instalado e rodando
- Banco de dados `concessionaria` criado no MySQL:

```sql
CREATE DATABASE concessionaria;
```

> As tabelas são criadas automaticamente ao iniciar o servidor (`CREATE TABLE IF NOT EXISTS`).

---

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd projeto-I-prog-web
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as credenciais do banco em `src/database/mysql.ts`:
   ```typescript
   const dbConfig = {
     host: 'localhost',
     port: 3306,
     user: 'root',
     password: 'sua_senha',
     database: 'concessionaria'
   };
   ```

---

## Como Executar

### Desenvolvimento

```bash
npm run dev
```

O servidor sobe em `http://localhost:3000`, cria as tabelas automaticamente e fica disponível para requisições.

### Produção

```bash
npm run build
npm run start
```

---

## Endpoints da API

### Clientes

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/clientes` | Lista todos os clientes |
| `GET` | `/clientes/:id` | Busca um cliente pelo ID |
| `GET` | `/clientes/notas/:id` | Lista notas fiscais de um cliente |
| `POST` | `/clientes` | Cadastra um novo cliente |
| `PUT` | `/clientes/:id` | Atualiza dados de um cliente |
| `DELETE` | `/clientes/:id` | Remove um cliente |

**Body POST/PUT:**
```json
{
  "nome": "João da Silva",
  "cpf": "111.111.111-11",
  "telefone": "(11) 99999-0001",
  "email": "joao@email.com",
  "cidade": "São Paulo"
}
```
> `nome`, `cpf` e `telefone` são obrigatórios. `email` e `cidade` são opcionais.

---

### Vendedores

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/vendedores` | Lista todos os vendedores |
| `GET` | `/vendedores/:id` | Busca um vendedor pelo ID |
| `GET` | `/vendedores/notas/:id` | Lista notas fiscais de um vendedor |
| `POST` | `/vendedores` | Cadastra um novo vendedor |
| `PUT` | `/vendedores/:id` | Atualiza dados de um vendedor |
| `DELETE` | `/vendedores/:id` | Remove um vendedor |

**Body POST/PUT:**
```json
{
  "nome": "Ana Souza",
  "matricula": "VND-001",
  "comissao_percentual": 5.5
}
```
> Todos os campos são obrigatórios.

---

### Carros

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/carros` | Lista todos os carros |
| `GET` | `/carros/disponiveis` | Lista carros com estoque disponível |
| `GET` | `/carros/:id` | Busca um carro pelo ID |
| `POST` | `/carros` | Cadastra um novo carro |
| `PUT` | `/carros/:id` | Atualiza dados de um carro |
| `DELETE` | `/carros/:id` | Remove um carro |

**Body POST/PUT:**
```json
{
  "marca": "Toyota",
  "modelo": "Corolla",
  "ano": 2024,
  "placa": "TST-0001",
  "preco": 110000.00,
  "cor": "Prata"
}
```
> Todos os campos são obrigatórios.

---

### Estoque

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/estoque` | Lista todos os registros de estoque |
| `GET` | `/estoque/:id` | Busca um registro de estoque pelo ID |
| `GET` | `/estoque/carro/:id` | Busca o estoque de um carro específico |
| `POST` | `/estoque` | Cadastra um registro de estoque |
| `PUT` | `/estoque/:id` | Atualiza um registro de estoque |
| `DELETE` | `/estoque/:id` | Remove um registro de estoque |

**Body POST/PUT:**
```json
{
  "id_carro": 1,
  "quantidade": 5,
  "localizacao_patio": "Galpão A-1",
  "data_entrada": "2025-06-01"
}
```
> Todos os campos são obrigatórios.

---

### Notas Fiscais

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/notas` | Lista todas as notas fiscais |
| `GET` | `/notas/:id` | Busca uma nota fiscal pelo ID |
| `POST` | `/notas` | Emite uma nova nota fiscal |
| `DELETE` | `/notas/:id` | Operação não permitida — notas são imutáveis |

**Body POST:**
```json
{
  "numero_nota": "NF-0001",
  "data_emissao": "2025-06-28",
  "valor_total": 120000.00,
  "id_cliente": 1,
  "id_vendedor": 1,
  "id_carro": 1
}
```
> Todos os campos são obrigatórios.

---

## Regras de Negócio

### Clientes
- `cpf` deve ser único — duplicidade retorna **409**
- `nome`, `cpf` e `telefone` são obrigatórios — ausência retorna **400**
- Cliente com notas fiscais vinculadas **não pode ser removido** — retorna **422**

### Vendedores
- `matricula` deve ser única — duplicidade retorna **409**
- `comissao_percentual` deve estar entre **0 e 30%** — fora do intervalo retorna **400**
- Vendedor com notas fiscais vinculadas **não pode ser removido** — retorna **422**

### Carros
- `placa` deve ser única — duplicidade retorna **409**
- `ano` deve estar entre **1950** e o **ano atual + 1** — fora do intervalo retorna **400**
- `preco` deve ser maior que zero — retorna **400**
- Carro com estoque ou notas fiscais vinculadas **não pode ser removido** — retorna **422**

### Estoque
- Cada carro pode ter **apenas um** registro de estoque — duplicidade retorna **409**
- `quantidade` não pode ser negativa — retorna **400**
- `data_entrada` não pode ser futura — retorna **400**
- O carro referenciado deve existir — caso contrário retorna **404**

### Notas Fiscais
- `numero_nota` deve ser único — duplicidade retorna **409**
- `data_emissao` não pode ser futura — retorna **400**
- `valor_total` deve ser maior que zero — retorna **400**
- Cliente, vendedor e carro referenciados devem existir — caso contrário retorna **404**
- O carro deve ter estoque disponível (quantidade > 0) — caso contrário retorna **422**
- Ao emitir uma nota, o estoque do carro é **decrementado automaticamente**
- Notas fiscais são **imutáveis** — não podem ser deletadas após a emissão (**422**)

---

## Códigos de Status HTTP

| Código | Significado |
|---|---|
| `200` | Sucesso (GET, PUT, DELETE) |
| `201` | Criado com sucesso (POST) |
| `400` | Dados inválidos ou campos obrigatórios ausentes |
| `404` | Recurso não encontrado |
| `409` | Violação de unicidade (CPF, placa, matrícula, número de nota duplicados) |
| `422` | Regra de negócio impede a operação |
| `500` | Erro interno do servidor |
