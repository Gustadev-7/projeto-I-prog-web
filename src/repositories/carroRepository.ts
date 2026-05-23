import { Carro } from "../models/Carro";

// Cria a classe do Repositorio para o Carro
export class CarroRepository {
    private static instance: CarroRepository; // Cria uma cópia do objeto
    private carroLista: Carro[] = []; // Criar uma lista com um array do objeto Carro

    private constructor() {}

    public static getInstance(): CarroRepository {
        if(!this.instance) {
            this.instance = new CarroRepository();
        }
        return this.instance;
    }

    // Função responsável por cadastrar novos carros
    cadastrarCarro(carro: Carro): void {
        this.carroLista.push(carro);
    }

    // Função responsável por listar todos os carros
    listarCarros(): Carro[] {
        return this.carroLista;
    }

    // Função responsável por lista o carro com o id fornecido pelo usuário
    listarPorId(id: number): Carro | undefined {
        return this.carroLista.find(carro => carro.id_carro === id);
    }

    // Função responsável por listar o carro com a placa fornecida pelo usuário
    buscarPorPlaca(placa: string): Carro | undefined {
        return this.carroLista.find(carro => carro.placa === placa);
    }

    // Função para atualizar o apenas com as propriedades que foram enviadas no corpo da requisição
    atualizarCarro(id: number, dados: Partial<Carro>): Carro | undefined {
        const carro = this.carroLista.find(carro => carro.id_carro === id);
        if (!carro) return undefined;

        Object.assign(carro, dados);
        return carro;
    }

    // Função para deletar o carro com id fornecido pelo usuário
    deletarCarro(id: number): Carro | undefined {
        const carro = this.carroLista.findIndex(carro => carro.id_carro === id);
        if(carro === -1) return undefined;

        const carroDeletado = this.carroLista[carro]; // Guarda uma cópia do carro antes de removê-lo para poder retornar no final

        this.carroLista.splice(carro, 1);

        return carroDeletado;
    }
}