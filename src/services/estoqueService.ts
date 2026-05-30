import { Estoque } from "../models/Estoque";        
import { EstoqueRepository } from "../repositories/estoqueRepository";
import { CarroRepository } from "../repositories/carroRepository";

export class EstoqueService {
    estoqueRepository: EstoqueRepository = EstoqueRepository.getInstance();
    carroRepository: CarroRepository = CarroRepository.getInstance();

    //criando o resgistro de estoque
    cadastrarEstoque(dados: any): Estoque {

        //Validação dos dados obrigatórios
        if(!dados.id_carro || dados.quantidade == null || !dados.localizacao_patio || !dados.data_entrada){
            throw new Error("Dados obrigatórios incompletos");
        }

        //verificar se o carro existe
        const carro = this.carroRepository.listarPorId(dados.id_carro);

        if(!carro){
            throw new Error("Carro não encontrado");
        }

        //quantidade deve ser maior ou igual a zero
        if(Number(dados.quantidade) < 0){
            throw new Error("Quantidade deve ser maior ou igual a zero");
        }

        //quantidade deve ser um número inteiro
        if(!Number.isInteger(Number(dados.quantidade))){
            throw new Error("Quantidade deve ser um número inteiro");
        }

        //validar data de entrada, não pode ser futura
        const data_entrada = new Date(dados.data_entrada);
        const hoje = new Date();


        if(data_entrada > hoje){
            throw new Error("Data de entrada não pode ser futura");
        }
        
        //verificar se já existe um estoque para o mesmo carro
        const estoqueExistente = this.estoqueRepository.filtraEstoquePorCarro(dados.id_carro);

        if(estoqueExistente){
            throw new Error("Já existe um estoque para este carro");
        }

        //criando o estoque com os dados da requisição
        const estoque = new Estoque(
            dados.id_carro,
            dados.quantidade,
            dados.localizacao_patio,
            dados.data_entrada
        );

        //insere no repositório
        this.estoqueRepository.insereEstoque(estoque);

        return estoque;
    }

    //buscar estoque por id
    buscarEstoque(id_estoque: number): Estoque {

        const estoque = this.estoqueRepository.filtraEstoquePorId(id_estoque);

        if(!estoque){
            throw new Error("Estoque não encontrado");
        }

        return estoque;
    }

    //buscar estoque por id do carro
    buscarEstoquePorCarro(id_carro: number): Estoque {
        const estoque = this.estoqueRepository.filtraEstoquePorCarro(id_carro);

        if(!estoque){
            throw new Error("Estoque não encontrado para este carro");
        }

        return estoque;
    }

    //atualizar estoque
    atualizarEstoque(id_estoque: number, dados: any): Estoque {
        //verificar se o estoque existe
        const estoque = this.estoqueRepository.filtraEstoquePorId(id_estoque);
        if(!estoque){
            throw new Error("Estoque não encontrado");
        }

        //se for fornecido id_carro, verificar se o carro existe
        if(dados.quantidade !== undefined && Number(dados.quantidade) < 0){
            throw new Error("Quantidade deve ser maior ou igual a zero");
        }

        //quantidade deve ser um número inteiro
        if(dados.quantidade !== undefined && !Number.isInteger(Number(dados.quantidade))){
            throw new Error("Quantidade deve ser um número inteiro");
        }

        if(dados.data_entrada){
            const data_entrada = new Date(dados.data_entrada);
            const hoje = new Date();

            if(data_entrada > hoje){
                throw new Error("Data de entrada não pode ser futura");
            }
        }

        const estoqueAtualizado = this.estoqueRepository.atualizarEstoque(id_estoque, dados);

        if(!estoqueAtualizado){
            throw new Error("Erro ao atualizar estoque");
        }

        return estoqueAtualizado;
    }

    //deletar estoque
    deletarEstoque(id_estoque: number): void {
        const estoqueDeletado = this.estoqueRepository.deletarEstoque(id_estoque);

        if(!estoqueDeletado){
            throw new Error("Estoque não encontrado para deletar");
        }
    }
 }
