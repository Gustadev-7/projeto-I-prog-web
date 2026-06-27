import { executarComandoSQL } from "../database/mysql";
import { Estoque } from "../model/Estoque";

export class EstoqueRepository {
    private static instance: EstoqueRepository; // Função para implementar o padrão Singleton
    private constructor() {} 

    // Função para obter a instância única do repositório
    public static getInstance(): EstoqueRepository {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }

    // Função para criar a tabela de estoque no banco de dados
    static getCreateTableQuery(): string {
        return `
            CREATE TABLE IF NOT EXISTS estoque (
                id_estoque INT AUTO_INCREMENT PRIMARY KEY,
                id_carro INT NOT NULL UNIQUE,
                quantidade INT NOT NULL,
                localizacao_patio VARCHAR(50) NOT NULL,
                data_entrada DATE NOT NULL,
                FOREIGN KEY (id_carro) REFERENCES carros(id_carro)
            );
        `;
    }

    // Inserir novo estoque no banco de dados
    async inserirEstoque(estoque: Estoque): Promise<Estoque> {
        // Formata a data de entrada para o formato YYYY-MM-DD antes de inserir no banco de dados
        const dataFormatada = estoque.data_entrada instanceof Date
            ? estoque.data_entrada.toISOString().split('T')[0]
            : estoque.data_entrada;

        // Executa o comando SQL para inserir o novo estoque no banco de dados
        const resultado = await executarComandoSQL(
            `INSERT INTO estoque (id_carro, quantidade, localizacao_patio, data_entrada) VALUES (?, ?, ?, ?)`,
            [estoque.id_carro, estoque.quantidade, estoque.localizacao_patio, dataFormatada]
        );
        return new Estoque(resultado.insertId, estoque.id_carro, estoque.quantidade, estoque.localizacao_patio, estoque.data_entrada);
    }

    // Buscar todos os estoques 
    async buscarTodosEstoque(): Promise<Estoque[]> {
        const linhas = await executarComandoSQL(`SELECT * FROM estoque`, []);
        return linhas.map((l: any) =>
            new Estoque(l.id_estoque, l.id_carro, l.quantidade, l.localizacao_patio, l.data_entrada)
        );
    }

    // Buscar estoque por ID
    async buscarEstoquePorId(id_estoque: number): Promise<Estoque | null> {
        const linhas = await executarComandoSQL(
            `SELECT * FROM estoque WHERE id_estoque = ?`, [id_estoque]
        );
        if (linhas.length === 0) return null;
        const l = linhas[0];
        return new Estoque(l.id_estoque, l.id_carro, l.quantidade, l.localizacao_patio, l.data_entrada);
    }

    // Buscar estoque por ID do carro
    async buscarEstoquePorCarro(id_carro: number): Promise<Estoque | null> {
        const linhas = await executarComandoSQL(
            `SELECT * FROM estoque WHERE id_carro = ?`, [id_carro]
        );
        if (linhas.length === 0) return null;
        const l = linhas[0];
        return new Estoque(l.id_estoque, l.id_carro, l.quantidade, l.localizacao_patio, l.data_entrada);
    }

    // Atualizar estoque existente
    async atualizarEstoque(id_estoque: number, dados: Partial<Estoque>): Promise<Estoque | null> {
        const campos = Object.keys(dados).filter(c => c !== 'id_estoque'); // Exclui o campo id_estoque da atualização
        if (campos.length === 0) return this.buscarEstoquePorId(id_estoque); // Se não houver campos para atualizar, retorna o estoque atual

        // Prepara os valores para a atualização, tratando a data de entrada se necessário
        const valores = campos.map(c => {
            const valor = (dados as any)[c]; // Acessa o valor do campo dinamicamente
            // Se o campo for data_entrada e o valor for uma instância de Date, formata para string no formato YYYY-MM-DD
            if (c === 'data_entrada' && valor instanceof Date) {
                return valor.toISOString().split('T')[0];
            }
            return valor; // Caso contrário, retorna o valor como está
        }); 

        const setClause = campos.map(c => `${c} = ?`).join(', '); // Cria a cláusula SET para a query SQL, unindo os campos com placeholders '?'

        // Executa o comando SQL de atualização no banco de dados
        await executarComandoSQL(
            `UPDATE estoque SET ${setClause} WHERE id_estoque = ?`,
            [...valores, id_estoque]
        );
        return this.buscarEstoquePorId(id_estoque); // Retorna o estoque atualizado após a execução do comando SQL
    }

    // Deletar estoque 
    async deletarEstoque(id_estoque: number): Promise<Estoque | null> {
        const estoque = await this.buscarEstoquePorId(id_estoque);
        if (!estoque) return null;

        await executarComandoSQL(`DELETE FROM estoque WHERE id_estoque = ?`, [id_estoque]);
        return estoque;
    }

    // Decrementar a quantidade de um estoque específico
    async decrementarQuantidade(id_carro: number): Promise<void> {
        // Executa o comando SQL para decrementar a quantidade do estoque associado ao id_carro
        await executarComandoSQL(
            `UPDATE estoque SET quantidade = quantidade - 1 WHERE id_carro = ?`,
            [id_carro]
        );
    }
}
