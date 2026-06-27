import { executarComandoSQL } from "../database/mysql";
import { NotaFiscal } from "../model/NotaFiscal";

export class NotaFiscalRepository {
    private static instance: NotaFiscalRepository; // Função para armazenar a instância única do repositório (Singleton)
    private constructor() {}

    // Função para obter a instância única do repositório (Singleton)
    public static getInstance(): NotaFiscalRepository {
        if (!this.instance) {
            this.instance = new NotaFiscalRepository();
        }
        return this.instance;
    }

    // Função para obter a query de criação da tabela "notas_fiscais" no banco de dados
    static getCreateTableQuery(): string {
        return `
            CREATE TABLE IF NOT EXISTS notas_fiscais (
                id_nota INT AUTO_INCREMENT PRIMARY KEY,
                numero_nota VARCHAR(30) NOT NULL UNIQUE,
                data_emissao DATE NOT NULL,
                valor_total DECIMAL(10,2) NOT NULL,
                id_cliente INT NOT NULL,
                id_vendedor INT NOT NULL,
                id_carro INT NOT NULL,
                FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
                FOREIGN KEY (id_vendedor) REFERENCES vendedores(id_vendedor),
                FOREIGN KEY (id_carro) REFERENCES carros(id_carro)
            );
        `;
    }

    // Função para mapear uma linha do resultado da consulta SQL para um objeto NotaFiscal
    private mapearLinha(l: any): NotaFiscal {
        // Retorna um novo objeto NotaFiscal com os valores obtidos da linha do resultado da consulta SQL
        return new NotaFiscal(l.id_nota, l.numero_nota, l.data_emissao, Number(l.valor_total), l.id_cliente, l.id_vendedor, l.id_carro);
    }

    // Função para inserir uma nova nota fiscal no banco de dados MySQL
    async inserir(nota: NotaFiscal): Promise<NotaFiscal> {
        // Formata a data de emissão da nota fiscal para o formato correto (YYYY-MM-DD) antes de inserir no banco de dados
        const dataFormatada = nota.data_emissao instanceof Date
            ? nota.data_emissao.toISOString().split('T')[0]
            : nota.data_emissao;

        // Executa o comando SQL para inserir a nova nota fiscal no banco de dados, passando os valores correspondentes
        const resultado = await executarComandoSQL(
            `INSERT INTO notas_fiscais (numero_nota, data_emissao, valor_total, id_cliente, id_vendedor, id_carro) VALUES (?, ?, ?, ?, ?, ?)`,
            [nota.numero_nota, dataFormatada, nota.valor_total, nota.id_cliente, nota.id_vendedor, nota.id_carro]
        );
        return new NotaFiscal(resultado.insertId, nota.numero_nota, nota.data_emissao, nota.valor_total, nota.id_cliente, nota.id_vendedor, nota.id_carro);
    }

    // Busca todas as notas fiscais
    async buscarTodas(): Promise<NotaFiscal[]> {
        const linhas = await executarComandoSQL(`SELECT * FROM notas_fiscais`, []);
        return linhas.map((l: any) => this.mapearLinha(l));
    }

    // Busca uma nota fiscal pelo ID
    async buscarPorId(id_nota: number): Promise<NotaFiscal | null> {
        const linhas = await executarComandoSQL(
            `SELECT * FROM notas_fiscais WHERE id_nota = ?`, [id_nota]
        );
        if (linhas.length === 0) return null;
        return this.mapearLinha(linhas[0]);
    }

    // Busca uma nota fiscal pelo número da nota
    async buscarPorNumero(numero_nota: string): Promise<NotaFiscal | null> {
        const linhas = await executarComandoSQL(
            `SELECT * FROM notas_fiscais WHERE numero_nota = ?`, [numero_nota]
        );
        if (linhas.length === 0) return null;
        return this.mapearLinha(linhas[0]);
    }

    // Busca notas fiscais por ID do cliente
    async buscarPorCliente(id_cliente: number): Promise<NotaFiscal[]> {
        const linhas = await executarComandoSQL(
            `SELECT * FROM notas_fiscais WHERE id_cliente = ?`, [id_cliente]
        );
        return linhas.map((l: any) => this.mapearLinha(l));
    }

    // Busca notas fiscais por ID do vendedor
    async buscarPorVendedor(id_vendedor: number): Promise<NotaFiscal[]> {
        const linhas = await executarComandoSQL(
            `SELECT * FROM notas_fiscais WHERE id_vendedor = ?`, [id_vendedor]
        );
        return linhas.map((l: any) => this.mapearLinha(l));
    }

    // Busca notas fiscais por ID do carro
    async buscarPorCarro(id_carro: number): Promise<NotaFiscal[]> {
        const linhas = await executarComandoSQL(
            `SELECT * FROM notas_fiscais WHERE id_carro = ?`, [id_carro]
        );
        return linhas.map((l: any) => this.mapearLinha(l));
    }
}
