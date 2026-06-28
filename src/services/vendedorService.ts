import { Vendedor } from "../model/Vendedor";
import { VendedorRepository } from "../repositories/vendedorRepository";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";

export class VendedorService {

    private vendedorRepository = VendedorRepository.getInstance();
    private notaFiscalRepository = NotaFiscalRepository.getInstance();

     // Cadastrar vendedor
    async cadastrarVendedor(dados: any): Promise<Vendedor> {

        // Validação dos campos obrigatórios
        if (
            !dados.nome ||
            !dados.matricula ||
            dados.comissao_percentual == null
        ) {
            throw {
                status: 400,
                message: "Dados obrigatórios incompletos."
            };
        }

        // Verifica se já existe um vendedor com a mesma matrícula
        const vendedorExistente =
            await this.vendedorRepository.buscarVendedorPorMatricula(
                dados.matricula
            );

        if (vendedorExistente) {
            throw {
                status: 409,
                message: "Matrícula já cadastrada."
            };
        }

        // Comissão deve estar entre 0 e 30%
        if (
            Number(dados.comissao_percentual) < 0 ||
            Number(dados.comissao_percentual) > 30
        ) {
            throw {
                status: 400,
                message: "A comissão deve estar entre 0 e 30%."
            };
        }

        const vendedor = new Vendedor(
            null,
            dados.nome,
            dados.matricula,
            Number(dados.comissao_percentual)
        );

        return await this.vendedorRepository.inserirVendedor(vendedor);
    }

    //buscar vendedor por id
    async buscarVendedor(id_vendedor: number): Promise<Vendedor> {
        const vendedor = await this.vendedorRepository.buscarVendedorPorId(id_vendedor);
        if (!vendedor) {
            throw {
                status: 404,
                message: "Vendedor não encontrado."
            };
        }
        return vendedor;
    }

    //listar todos os vendedores
    async listarVendedores(): Promise<Vendedor[]> {
        return await this.vendedorRepository.buscarTodosVendedores();
    }

    //listar notas fiscais por vendedor
    async listarNotasPorVendedor(id_vendedor: number): Promise<any[]> {
        // Verifica se o vendedor existe
        const vendedor = await this.vendedorRepository.buscarVendedorPorId(id_vendedor);
        if (!vendedor) {
            throw {
                status: 404,
                message: "Vendedor não encontrado."
            };
        }
        return await this.notaFiscalRepository.buscarPorVendedor(id_vendedor);
    }

    //atualizar vendedor
    async atualizarVendedor(
        id_vendedor: number,
        dados: Partial<Vendedor>
    ): Promise<Vendedor> {

        // Verifica se o vendedor existe
        const vendedor =
            await this.vendedorRepository.buscarVendedorPorId(id_vendedor);

        if (!vendedor) {
            throw {
                status: 404,
                message: "Vendedor não encontrado."
            };
        }

        // Verifica matrícula duplicada
        if (dados.matricula !== undefined) {

            const vendedorExistente =
                await this.vendedorRepository.buscarVendedorPorMatricula(
                    dados.matricula
                );

            if (
                vendedorExistente &&
                vendedorExistente.id_vendedor !== id_vendedor
            ) {
                throw {
                    status: 409,
                    message: "Matrícula já cadastrada para outro vendedor."
                };
            }
        }

        // Validação da comissão
        if (
            dados.comissao_percentual !== undefined &&
            (
                dados.comissao_percentual < 0 ||
                dados.comissao_percentual > 30
            )
        ) {
            throw {
                status: 400,
                message: "A comissão deve estar entre 0 e 30%."
            };
        }

        const vendedorAtualizado =
            await this.vendedorRepository.atualizarVendedor(
                id_vendedor,
                dados
            );

        if (!vendedorAtualizado) {
            throw {
                status: 404,
                message: "Vendedor não encontrado."
            };
        }

        return vendedorAtualizado;
    }

    //deletar vendedor
    async deletarVendedor(id_vendedor: number): Promise<void> {

        // Verifica se o vendedor existe
        const vendedor =
            await this.vendedorRepository.buscarVendedorPorId(id_vendedor);

        if (!vendedor) {
            throw {
                status: 404,
                message: "Vendedor não encontrado."
            };
        }

        // Verifica se o vendedor possui notas fiscais
        const notasAssociadas =
            await this.notaFiscalRepository.buscarPorVendedor(id_vendedor);

        if (notasAssociadas.length > 0) {
            throw {
                status: 422,
                message: "Não é possível excluir um vendedor que possui notas fiscais."
            };
        }

        await this.vendedorRepository.deletarVendedor(id_vendedor);
    }
}

