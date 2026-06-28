import { Estoque } from "../model/Estoque";
import { EstoqueRepository } from "../repositories/estoqueRepository";
import { CarroRepository } from "../repositories/carroRepository";

export class EstoqueService {
    private estoqueRepository = EstoqueRepository.getInstance();
    private carroRepository = CarroRepository.getInstance();

    // Cadastrar estoque
    async cadastrarEstoque(dados: any): Promise<Estoque> {

        if (
            dados.id_carro == null ||
            dados.quantidade == null ||
            !dados.localizacao_patio ||
            !dados.data_entrada
        ) {
            throw {
                status: 400,
                message: "Dados obrigatórios incompletos."
            };
        }

        const carro = await this.carroRepository.buscarCarroPorId(
            Number(dados.id_carro)
        );

        if (!carro) {
            throw {
                status: 404,
                message: "Carro não encontrado."
            };
        }

        const estoqueExistente =
            await this.estoqueRepository.buscarEstoquePorCarro(
                Number(dados.id_carro)
            );

        if (estoqueExistente) {
            throw {
                status: 409,
                message: "Já existe estoque cadastrado para este carro."
            };
        }

        if (Number(dados.quantidade) < 0) {
            throw {
                status: 400,
                message: "A quantidade deve ser maior que zero."
            };
        }

        const dataEntrada = new Date(dados.data_entrada);
        const hoje = new Date();
        if (dataEntrada > hoje) {
            throw {
                status: 400,
                message: "A data de entrada não pode ser futura."
            };
        }

        const estoque = new Estoque(
            null,
            Number(dados.id_carro),
            Number(dados.quantidade),
            dados.localizacao_patio,
            new Date(dados.data_entrada)
        );

        return await this.estoqueRepository.inserirEstoque(estoque);
    }

    // Buscar estoque por ID
    async buscarEstoque(id_estoque: number): Promise<Estoque> {
        const estoque = await this.estoqueRepository.buscarEstoquePorId(id_estoque);

        if (!estoque) {
            throw {
                status: 404,
                message: "Estoque não encontrado."
            };
        }

        return estoque;
    }

    //Buscar estoque por ID do carro
     async buscarEstoquePorCarro(id_carro: number): Promise<Estoque> {

        const estoque =
            await this.estoqueRepository.buscarEstoquePorCarro(id_carro);

        if (!estoque) {
            throw {
                status: 404,
                message: "Estoque não encontrado para este carro."
            };
        }

        return estoque;
    }

     // listar todos
    async listarEstoque(): Promise<Estoque[]> {

        return await this.estoqueRepository.buscarTodosEstoque();
    }

    //atualizar estoque
        // Atualizar estoque
    async atualizarEstoque(
        id_estoque: number,
        dados: Partial<Estoque>
    ): Promise<Estoque> {

        const estoqueAtual =
            await this.estoqueRepository.buscarEstoquePorId(id_estoque);

        if (!estoqueAtual) {
            throw {
                status: 404,
                message: "Estoque não encontrado."
            };
        }

        if (
            dados.quantidade !== undefined &&
            dados.quantidade < 0
        ) {
            throw {
                status: 400,
                message: "A quantidade deve ser maior que zero."
            };
        }

        if (dados.id_carro !== undefined) {

            const carro =
                await this.carroRepository.buscarCarroPorId(
                    dados.id_carro
                );

            if (!carro) {
                throw {
                    status: 404,
                    message: "Carro não encontrado."
                };
            }

            const estoqueExistente =
                await this.estoqueRepository.buscarEstoquePorCarro(
                    dados.id_carro
                );

            if (
                estoqueExistente &&
                estoqueExistente.id_estoque !== id_estoque
            ) {
                throw {
                    status: 409,
                    message: "Já existe estoque para este carro."
                };
            }
        }

        const estoqueAtualizado =
            await this.estoqueRepository.atualizarEstoque(
                id_estoque,
                dados
            );

        if (!estoqueAtualizado) {
            throw {
                status: 404,
                message: "Estoque não encontrado."
            };
        }

        return estoqueAtualizado;
    }

    //deletar estoque
        async deletarEstoque(id_estoque: number): Promise<void> {

        const estoque =
            await this.estoqueRepository.deletarEstoque(id_estoque);

        if (!estoque) {
            throw {
                status: 404,
                message: "Estoque não encontrado."
            };
        }
    }
}