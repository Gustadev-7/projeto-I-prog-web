import { executarComandoSQL } from "../database/mysql";
import { Cliente } from "../model/Cliente";

export class ClienteRepository{

    //criando instancia para não haver duplicidade de dados, garante apenas um repositório de clientes

    private static instance: ClienteRepository; 
    private constructor () {}

    public static getInstance(): ClienteRepository{
        if(!this.instance){
            this.instance = new ClienteRepository ();
        }
        return this.instance
    }

    static getCreateTableQuery(): string {
        return `CREATE TABLE IF NOT EXISTS clientes (
            id_cliente INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            cpf VARCHAR(14) NOT NULL UNIQUE,
            telefone VARCHAR(20) NOT NULL,
            email VARCHAR(100),
            cidade VARCHAR(100)
            );
        `;
    }

    // Inserindo cliente no array de clientes
    async inserirCliente(clientes: Cliente){
        const resultado = await executarComandoSQL(
            `INSERT INTO clientes (nome, cpf, telefone, email, cidade) VALUES (?, ?, ?, ?, ?)`,
            [clientes.nome, clientes.cpf, clientes.telefone, clientes.email, clientes.cidade]
        );
        return new Cliente(resultado.insertId, clientes.nome, clientes.cpf, clientes.telefone, clientes.email, clientes.cidade);
    }

    // Filtrando todos os clientes 
    async buscarTodosClientes(): Promise<Cliente[]> {
        const linhas = await executarComandoSQL(`SELECT * FROM clientes`, []);
        return linhas.map((linha: any) =>
            new Cliente(linha.id_cliente, linha.nome, linha.cpf, linha.telefone, linha.email, linha.cidade)
        );
    }

    // Filtrando por id
    async buscarClientePorId(id_cliente: Number): Promise<Cliente | null> {
        const linhas = await executarComandoSQL(`
            SELECT * FROM clientes WHERE id_cliente = ?`, [id_cliente]
        );
        if (linhas.length === 0) return null;
        const linha = linhas[0];
        return new Cliente(linha.id_cliente, linha.nome, linha.cpf, linha.telefone, linha.email, linha.cidade);
    }   

    // Filtrando por CPF 
    async buscarClientePorCPF(cpf: string): Promise<Cliente | null> {
        const linhas = await executarComandoSQL(`
            SELECT * FROM clientes WHERE cpf = ?`, [cpf]
        );
        if (linhas.length === 0) return null;
        const linha = linhas[0];
        return new Cliente(linha.id_cliente, linha.nome, linha.cpf, linha.telefone, linha.email, linha.cidade);
    }

    // Atualizando cliente por id, atualização parcial dos dados 
    async atualizarCliente(id_cliente: Number, dados: Partial<Cliente>): Promise<Cliente | null> {
        const campos = Object.keys(dados).filter(c => c !== 'id_cliente'); // Exclui o campo 'id_cliente' da lista de campos a serem atualizados, pois não é permitido atualizar o ID do cliente
        if (campos.length === 0) return this.buscarClientePorId(id_cliente); // Se não houver campos a serem atualizados, retorna o cliente existente sem alterações

        const setClause = campos.map(c => `${c} = ?`).join(', '); // Cria a cláusula SET da query SQL, onde cada campo a ser atualizado é mapeado para um placeholder '?', e os campos são separados por vírgulas
        const valores = campos.map(c => (dados as any)[c]); // Cria um array de valores correspondentes aos campos a serem atualizados, obtendo os valores do objeto 'dados' usando a notação de índice

        // Executa a query SQL de atualização no banco de dados, passando a cláusula SET e os valores correspondentes, juntamente com o ID do cliente a ser atualizado
        await executarComandoSQL(
            `UPDATE clientes SET ${setClause} WHERE id_cliente = ?`, [...valores, id_cliente]
        );
        return this.buscarClientePorId(id_cliente); // Retorna o cliente atualizado
    }
 
    // Deletando cliente
    async deletarCliente(id_cliente: Number): Promise<Cliente | null> {
        const cliente = await this.buscarClientePorId(id_cliente);
        if (!cliente) return null;

        await executarComandoSQL(
            `DELETE FROM clientes WHERE id_cliente = ?`, [id_cliente]
        );
        return cliente;   
    }

}