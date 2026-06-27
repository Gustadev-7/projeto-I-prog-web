import { Carro } from "../model/Carro";
import { EstoqueRepository } from "./estoqueRepository";
import { NotaFiscalRepository } from "./notaFiscalRepository";

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
    deletarCarro(id: number): Carro | string | undefined {
        const estoqueRepository = EstoqueRepository.getInstance(); // Cria uma instância do repositório de estoque 
        const notaFiscalRepository = NotaFiscalRepository.getInstance(); // Cria uma instância do repositório de nota fiscal

        const carroEmEstoque = estoqueRepository.filtraEstoquePorCarro(id); // Verifica se o carro está presente no estoque
        // Se o carro estiver presente no estoque e a quantidade for maior que 0
        if (carroEmEstoque && carroEmEstoque.quantidade > 0) {
            return "Não é possível excluir o carro, pois ele possui estoque."; // Retorna uma mensagem informando que o carro não pode ser excluído
        }

        const carroEmNotaFiscal = notaFiscalRepository.filtrarNotasCarro(id); // Verifica se o carro está presente em alguma nota fiscal
        // Se o carro estiver presente em alguma nota fiscal
        if (carroEmNotaFiscal.length > 0) {
            return "Não é possível excluir o carro, pois ele está associado a uma ou mais notas fiscais."; // Retorna uma mensagem informando que o carro não pode ser excluído
        }

        const carroIndex = this.carroLista.findIndex(carro => carro.id_carro === id); // Encontra o índice do carro na lista de carros
        if(carroIndex === -1) return undefined; // Se o carro não for encontrado, retorna undefined

        const carroDeletado = this.carroLista[carroIndex]; // Guarda uma cópia do carro antes de removê-lo para poder retornar no final

        this.carroLista.splice(carroIndex, 1); // Remove o carro da lista de carros usando o índice encontrado

        return carroDeletado;
    }
}