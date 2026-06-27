<<<<<<< HEAD
import { executarComandoSQL } from "../database/mysql";
//importando a função que executa queries sql no banco 
import { Carro } from "../models/Carro";
=======
import { Carro } from "../model/Carro";
import { EstoqueRepository } from "./estoqueRepository";
import { NotaFiscalRepository } from "./notaFiscalRepository";
>>>>>>> f8a1679fbb042bdc6f149fe1634d930f54328e40

// Cria a classe do Repositorio para o Carro
export class CarroRepository {
    private static instance: CarroRepository; // Cria uma cópia do objeto

    private constructor() {}

    public static getInstance(): CarroRepository {
        if(!this.instance) {
            this.instance = new CarroRepository();
        }
        return this.instance;
    }

    //define o SQL de criação da tabela carro 
    static getCreateTableQuery(): string{
        return `
            CREATE TABLE IF NOT EXISTS carros (
                id_carro INT AUTO_INCREMENT PRIMARY KEY,
                marca VARCHAR(50) NOT NULL,
                modelo VARCHAR(50) NOT NULL,
                ano INT NOT NULL,
                placa VARCHAR(10) NOT NULL UNIQUE,
                preco DECIMAL(10,2) NOT NULL,
                cor VARCHAR(30) NOT NULL
        );
        `;
    }
    
    // Função responsável por inserir um carro no banco de dados
    async inserirCarro(carro: Carro): Promise<Carro> { 
        //async função assincrona que retorna uma Promise (erro ou sucesso) do tipo Carro

        const resultado = await executarComandoSQL(
            // os ? são substituídos pelos valores do array abaixo
            `INSERT INTO carros (marca, modelo, ano, placa, preco, cor) VALUES (?, ?, ?, ?, ?, ?)`,
            [carro.marca, carro.modelo, carro.ano, carro.placa, carro.preco, carro.cor]
        )
        return new Carro(resultado.insertId, carro.marca, carro.modelo, carro.ano, carro.placa, carro.preco, carro.cor);
    }

    // Função responsável por listar todos os carros do banco de dados
    async buscarTodoCarros(): Promise<Carro[]> {
        const linhas = await executarComandoSQL(`SELECT * FROM carros`, []); // SELECT retorna array de objetos puros (JSON), não instâncias de Carro

        return linhas.map((l: any)=> // map percorre cada linha e converte para objeto Carro
            new Carro(l.id_carro, l.marca, l.modelo, l.ano, l.placa, l.preco, l.cor)
    );
}

// Função responsável por buscar um carro pelo id fornecido pelo usuário
    async buscarCarroPorId(id_carro: number): Promise<Carro | null> {
        const linhas = await executarComandoSQL(
            `SELECT * FROM carros WHERE id_carro = ?`, [id_carro]  // ? é substituído pelo id_carro
        );
        if (linhas.length === 0) return null; // SELECT sempre retorna array, se vazio não encontrou
        const l = linhas[0];   // pega o primeiro (e único) elemento do array
        return new Carro(l.id_carro, l.marca, l.modelo, l.ano, l.placa, l.preco, l.cor);
    }

    //Busca por placa para validar 
    async buscarCarroPorPlaca(placa: string): Promise<Carro | null > {
        const linhas = await executarComandoSQL(
            `SELECT * FROM carros WHERE placa = ?`, [placa]
        );
        if(linhas.length === 0) return null; // placa não encontrada
        const l = linhas[0];
        return new Carro(l.id_carro, l.marca, l.modelo, l.ano, l.placa, l.preco, l.cor);
    }

    // Função para atualizar o apenas com as propriedades que foram enviadas no corpo da requisição
    async atualizarCarro(id_carro: number, dados: Partial<Carro>): Promise<Carro | null> {
        const campos = Object.keys(dados).filter(c => c !== 'id_carro');
        // // filtra o id_carro para não atualizar a chave primária

        if(campos.length === 0) return this.buscarCarroPorId(id_carro);
        const setClause = campos.map(c => `${c} = ?`).join(', '); // monta → "marca = ?, preco = ?"
        const valores = campos.map(c => (dados as any)[c]); // pega os valores → ["Toyota", 120000]
        await executarComandoSQL(
            `UPDATE carros SET ${setClause} WHERE id_carro = ?`,
            [...valores, id_carro]
        );
        return this.buscarCarroPorId(id_carro);
    }

    // Função para deletar o carro com id fornecido pelo usuário
    async deletarCarro(id_carro: number): Promise<Carro | null> {
        const carro = await this.buscarCarroPorId(id_carro);
        if(!carro) return null;
        await executarComandoSQL(`DELETE FROM carro WHERE id_carro = ?`, [id_carro]);  // remove do banco
        return carro;
    }
}