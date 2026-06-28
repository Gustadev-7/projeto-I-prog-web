import { Carro } from '../model/Carro';
import { CarroRepository } from '../repositories/carroRepository';
import { EstoqueRepository } from '../repositories/estoqueRepository';
import { Estoque } from '../model/Estoque';
import { NotaFiscalRepository } from '../repositories/notaFiscalRepository';

export class CarroService {

    carroRepository: CarroRepository = CarroRepository.getInstance();
    estoqueRepository: EstoqueRepository = EstoqueRepository.getInstance();
    //cadastrar carro
    async cadastrarCarro(dados: any): Promise<Carro> {

        //Validação dos campos obrigatórios
        if(
            !dados.marca ||
            !dados.modelo ||
            !dados.ano ||
            !dados.placa ||
            dados.preco == null ||
            !dados.cor
        ){
            throw{
                status: 400,
                message: 'Campos obrigatórios não preenchidos'
            };
        }

        //placa duplicada
        const carroExistente = await this.carroRepository.buscarCarroPorPlaca(dados.placa);

        if(carroExistente){
            throw{
                status: 409,
                message: 'Placa já cadastrada'
            };
        }

        //preço negativo
        if(Number(dados.preco) <= 0){
            throw{
                status: 400,
                message: 'Preço deve ser maior que zero'
            };
        }

        //ano
        const anoAtual = new Date().getFullYear() + 1;

        if(
            Number(dados.ano) < 1950 ||
            Number(dados.ano) > anoAtual
        ){
            throw{
                status: 400,
                message: 'Ano inválido'
            };
        }
        
        const carro = new Carro(
            null,
            dados.marca,
            dados.modelo,
            dados.ano,
            dados.placa,
            dados.preco,
            dados.cor
        );

         return await this.carroRepository.inserirCarro(carro);
    }

    //buscar carro
    async buscarCarro(id_carro: number): Promise<Carro> {

        const carro = await this.carroRepository.buscarCarroPorId(id_carro);

         if(!carro){
            throw {
                status: 404,
                message: "Carro não encontrado"
            };
        }

        return carro;
    }

    //Listar todos os carros
    async listarCarros(): Promise<Carro[]> {
        return await this.carroRepository.buscarTodoCarros();
    }

    //Listar carros disponíveis
    async listarCarrosDisponiveis(): Promise<Carro[]> {

    const carros = await this.carroRepository.buscarTodoCarros();

    const estoques = await this.estoqueRepository.buscarTodosEstoque();

    const carrosDisponiveis = carros.filter(carro => {

        const estoque = estoques.find(
            (e: Estoque) => e.id_carro === carro.id_carro
        );

        return estoque && estoque.quantidade > 0;
    });

    return carrosDisponiveis;
}

    //atualizar carro
    async atualizarCarro(id_carro: number, dadosAtualizados: any): Promise<Carro> {

        const carro = await this.carroRepository.buscarCarroPorId(id_carro);

        if(!carro){
            throw {
                status: 404,
                message: "Carro não encontrado"
            };
        }

        //validar placa
        if(dadosAtualizados.placa){
            const placaExistente = await this.carroRepository.buscarCarroPorPlaca(dadosAtualizados.placa);

            if(placaExistente && placaExistente.id_carro !== id_carro){
                throw {
                    status: 400,
                    message: "Placa já cadastrada"
                };
            }
        }

        //validar preço
        if(dadosAtualizados.preco !== undefined && Number(dadosAtualizados.preco) <= 0){
            throw {
                status: 400,
                message: "Preço deve ser maior que zero"
            };
        }

        //validar ano
        if(dadosAtualizados.ano !== undefined){
            const anoAtual = new Date().getFullYear() + 1;

            if(dadosAtualizados.ano <= 1950 || dadosAtualizados.ano > anoAtual){
                throw {
                    status: 400,
                    message: "Ano inválido"
                };
            }
        }

        //atualizar carro
        const carroAtualizado =
            await this.carroRepository.atualizarCarro(
                id_carro,
                dadosAtualizados
            );

        if(!carroAtualizado){
            throw {
                status: 404,
                message: "Carro não encontrado"
            };
        }

        return carroAtualizado;

    }

    //deletar carro
    async deletarCarro(id_carro: number): Promise<void> {

        //verificar estoque do carro antes de deletar
        const estoque = await this.estoqueRepository.buscarEstoquePorCarro(id_carro);

        if(estoque && estoque.quantidade > 0){
            throw {
                status: 422,
                message: "Não é possível deletar o carro, pois ele possui estoque disponível."
            };
        }

        //verificar notas fiscais do carro antes de deletar
        const notasFiscais = await NotaFiscalRepository.getInstance().buscarPorCarro(id_carro);

        if(notasFiscais.length > 0){
            throw {
                status: 422,
                message: "Não é possível deletar o carro, pois ele possui notas fiscais associadas."
            };
        }

        const carroDeletado = await this.carroRepository.deletarCarro(id_carro);


        if(!carroDeletado){
            throw {
                status: 404,
                message: "Carro não encontrado"
            };
        }
    }
}