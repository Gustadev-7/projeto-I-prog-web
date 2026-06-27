import { Vendedor } from "../model/Vendedor"
import { executarComandoSQL } from "../database/mysql"

export class VendedorRepository{
    private static instance: VendedorRepository;
    private constructor () {}

    // Função singleton para garantir que haja apenas uma instância do repositório
    public static getInstance(): VendedorRepository{
        if(!this.instance){
            this.instance = new VendedorRepository();
        }
        return this.instance;
    }

    static getCreateTableQuery(): string {
        return `
            CREATE TABLE IF NOT EXISTS vendedores (
                id_vendedor INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(100) NOT NULL,
                matricula VARCHAR(255) NOT NULL UNIQUE,
                comissao_percentual DECIMAL(5, 2) NOT NULL
            )
        `;
    }

    // Cadastrar vendedor
    async inserirVendedor(vendedor: Vendedor): Promise<Vendedor> {
        const resultado = await executarComandoSQL(
            `INSERT INTO vendedores (nome, matricula, comissao_percentual) VALUES (?, ?, ?)`,
            [vendedor.nome, vendedor.matricula, vendedor.comissao_percentual]
        );
        return new Vendedor(resultado.insertId, vendedor.nome, vendedor.matricula, vendedor.comissao_percentual);
    }

    // Listar vendedores
    async buscarTodosVendedores(): Promise<Vendedor[]> {
        const linhas = await executarComandoSQL(
            `SELECT * FROM vendedores`, []
        );
        return linhas.map((linha: any) => 
            new Vendedor(linha.id_vendedor, linha.nome, linha.matricula, Number(linha.comissao_percentual))
        );
    }

    // Filtrar vendedor por id
    async buscarVendedorPorId(id_vendedor: number): Promise<Vendedor | null> {
        const linhas = await executarComandoSQL(
            `SELECT * FROM vendedores WHERE id_vendedor = ?`, [id_vendedor]
        );
        if (linhas.length === 0) return null;
        const linha = linhas[0];
        return new Vendedor(linha.id_vendedor, linha.nome, linha.matricula, Number(linha.comissao_percentual));
    }

    // Filtrar vendedor por matrícula
    async buscarVendedorPorMatricula(matricula: string): Promise<Vendedor | null> {
        const linhas = await executarComandoSQL(
            `SELECT * FROM vendedores WHERE matricula = ?`, [matricula]
        );
        if (linhas.length === 0) return null;
        const linha = linhas[0];
        return new Vendedor(linha.id_vendedor, linha.nome, linha.matricula, Number(linha.comissao_percentual));
    }
    
    // Atualizar vendedor
    async atualizarVendedor(id_vendedor: number, dados: Partial<Vendedor>): Promise<Vendedor | null> {
        const campos = Object.keys(dados).filter(campo => campo !== 'id_vendedor');
        if (campos.length === 0) 
            return this.buscarVendedorPorId(id_vendedor);

        const setClause = campos.map(campo => `${campo} = ?`).join(', ');
        const valores = campos.map(campo => (dados as any)[campo]);

        await executarComandoSQL(
            `UPDATE vendedores SET ${setClause} WHERE id_vendedor = ?`, 
            [...valores, id_vendedor]
        );
        return this.buscarVendedorPorId(id_vendedor);
    }

    // Deletar vendedor
    async deletarVendedor(id_vendedor: number): Promise<Vendedor | null> {
        const vendedor = await this.buscarVendedorPorId(id_vendedor);
        if (!vendedor) return null;
        
        await executarComandoSQL(
            `DELETE FROM vendedores WHERE id_vendedor = ?`, [id_vendedor]
        );
        return vendedor;
    }
}