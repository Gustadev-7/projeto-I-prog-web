# Sistema de Gerenciamento de Concessionária

Este é um projeto de API REST para um sistema de gerenciamento de concessionária, desenvolvido como parte do curso de Análise e Desenvolvimento de Sistemas, para a matéria de Programação paraWeb lecionada pelo profesor Anisio Alfredo da Silva Junior. A API permite gerenciar carros, clientes, vendedores, estoque e notas fiscais.

## Tecnologias Utilizadas

*   **Node.js**: Ambiente de execução JavaScript.
*   **Express**: Framework para construção de APIs em Node.js.
*   **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
*   **ts-node**: Permite executar arquivos TypeScript diretamente no Node.js sem a necessidade de compilação prévia em ambiente de desenvolvimento.

## Instalação

1.  Clone o repositório:
    ```bash
    git clone <url-do-repositorio>
    ```
2.  Navegue até o diretório do projeto:
    ```bash
    cd projeto-I-prog-web
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```

## Como Executar

### Ambiente de Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento com hot-reload (reinicia o servidor a cada alteração no código), execute:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

### Ambiente de Produção

Para compilar o projeto e iniciá-lo em modo de produção, siga os passos:

1.  Compile os arquivos TypeScript para JavaScript:
    ```bash
    npm run build
    ```
2.  Inicie o servidor:
    ```bash
    npm run start
    ```

O servidor estará disponível em `http://localhost:3000`.

## Endpoints da API

A seguir estão listados todos os endpoints disponíveis na API, agrupados por recurso.

### Clientes

| Método | Rota                      | Descrição                               |
| :----- | :------------------------ | :---------------------------------------- |
| `GET`  | `/clientes`               | Lista todos os clientes.                  |
| `GET`  | `/clientes/:id`           | Busca um cliente específico pelo ID.      |
| `GET`  | `/clientes/notas/:id`     | Lista todas as notas fiscais de um cliente. |
| `POST` | `/clientes`               | Cadastra um novo cliente.                 |
| `PUT`  | `/clientes/:id_cliente`   | Atualiza os dados de um cliente.          |
| `DELETE`| `/clientes/:id_cliente`   | Deleta um cliente.                        |

### Vendedores

| Método | Rota                        | Descrição                                 |
| :----- | :-------------------------- | :---------------------------------------- |
| `GET`  | `/vendedores`               | Lista todos os vendedores.                |
| `GET`  | `/vendedores/:id_vendedor`  | Busca um vendedor específico pelo ID.     |
| `GET`  | `/vendedores/notas/:id`     | Lista todas as notas fiscais de um vendedor.|
| `POST` | `/vendedores`               | Cadastra um novo vendedor.                |
| `PUT`  | `/vendedores/:id_vendedor`  | Atualiza os dados de um vendedor.         |
| `DELETE`| `/vendedores/:id_vendedor`  | Deleta um vendedor.                       |

### Carros

| Método | Rota                      | Descrição                               |
| :----- | :------------------------ | :---------------------------------------- |
| `GET`  | `/carros`                 | Lista todos os carros.                    |
| `GET`  | `/carros/disponiveis`     | Lista todos os carros disponíveis em estoque.|
| `GET`  | `/carros/:id`             | Busca um carro específico pelo ID.        |
| `POST` | `/carros`                 | Cadastra um novo carro.                   |
| `PUT`  | `/carros/:id`             | Atualiza os dados de um carro.            |
| `DELETE`| `/carros/:id`             | Deleta um carro.                          |

### Estoque

| Método | Rota                        | Descrição                               |
| :----- | :-------------------------- | :---------------------------------------- |
| `GET`  | `/estoque`                  | Lista todos os itens no estoque.          |
| `GET`  | `/estoque/:id_estoque`      | Busca um item de estoque pelo seu ID.     |
| `GET`  | `/estoque/carro/:id_carro`  | Busca o estoque de um carro específico.   |
| `POST` | `/estoque`                  | Adiciona um novo item ao estoque.         |
| `PUT`  | `/estoque/:id_estoque`      | Atualiza um item do estoque.              |
| `DELETE`| `/estoque/:id_estoque`      | Deleta um item do estoque.                |

### Nota Fiscal

| Método | Rota                | Descrição                               |
| :----- | :------------------ | :---------------------------------------- |
| `GET`  | `/notas`            | Lista todas as notas fiscais.             |
| `GET`  | `/notas/:id_nota`   | Busca uma nota fiscal pelo seu ID.        |
| `POST` | `/notas`            | Emite uma nova nota fiscal.               |
| `DELETE`| `/notas/:id_nota`   | Deleta uma nota fiscal.                   |

---
