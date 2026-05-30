import { Carro } from "../models/Carro";
import { CarroRepository } from "../repositories/carroRepository";

export class CarroService {
    private carroRepository = CarroRepository.getInstance();

    // Regras de Negócio para cadastro de carros
    cadastrarCarro(dados: any): Carro {
        const { marca, modelo, ano, placa, preco, cor } = dados;

        // Valida o campo obrigatório placa
        if(!placa) {
            throw { status: 400, message: "O campo placa é obrigatório." }
        }

        // Valida se já existe o campo placa
        const placaExiste = this.carroRepository.buscarPorPlaca(placa);
        if(placaExiste) {
            throw { status: 409, message: "Não é permitido cadastrar dois carros com a mesma placa." };
        }

        // Valida se o ano do veiculo está entre 1950 e o ano atual + 1
        const anoMaximoPermitido = new Date().getFullYear() + 1;
        if(ano < 1950 || ano > anoMaximoPermitido) {
            throw { status: 400, message: `O ano deve ser entre 1950 e ${anoMaximoPermitido}.` };
        }

        // Verifica se o preço é positivo e maior que zero
        if(preco <= 0) {
            throw { status: 400, message: "O preço deve ser um valor positivo e maior que zero." };
        }

        const novoCarro = new Carro(marca, modelo, ano, placa, preco, cor);
        this.carroRepository.cadastrarCarro(novoCarro);

        return novoCarro;
    }

    // Listagem de todos os carros
    listarTodos(): Carro[] {
        return this.carroRepository.listarCarros();
    }

    // Busca de carro por ID
    buscarPorId(id: number): Carro {
        const carro = this.carroRepository.listarPorId(id);

        if(!carro) {
            throw {status: 404, message: "Carro não encotrado pelo ID informado."};
        }

        return carro;
    }

    // Regras de Negócio para atualização de carros
    atualizarCarro(id: number, dadosAtualizados: Partial<Carro>):Carro {
        this.buscarPorId(id);

        // Se tentar atualizar a placa, verifica se ela já pertence a outro carro
        if(dadosAtualizados.placa) {
            const carroComPlaca = this.carroRepository.buscarPorPlaca(dadosAtualizados.placa);
            if (carroComPlaca && carroComPlaca.id_carro !== id) {
                throw { status: 409, message: "Esta placa já está sendo utilizada por outro veículo." };
            }
        }

        // Se tentar atualizar o ano, verifica se ele atende as regras
        if (dadosAtualizados.ano) {
            const anoMaximoPermitido = new Date().getFullYear() + 1;
            if (dadosAtualizados.ano < 1950 || dadosAtualizados.ano > anoMaximoPermitido) {
                throw { status: 400, message: `O ano deve ser entre 1950 e ${anoMaximoPermitido}.` };
            }
        }

        // Se tentar atualizar o preço, verifica se ele atende as regras
        if (dadosAtualizados.preco !== undefined && dadosAtualizados.preco <= 0) {
            throw { status: 400, message: "O preço deve ser um valor positivo maior que zero." };
        }

        return this.carroRepository.atualizarCarro(id, dadosAtualizados)!;
    }

    // Regras de Negócio para deletar carros
    deletarCarro(id: number): void {
        this.buscarPorId(id);
        this.carroRepository.deletarCarro(id);
    }
}