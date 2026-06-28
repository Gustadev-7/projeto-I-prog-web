import { NotaFiscal } from "../model/NotaFiscal";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";
import { ClienteRepository } from "../repositories/clienteRepository";
import { VendedorRepository } from "../repositories/vendedorRepository";
import { CarroRepository } from "../repositories/carroRepository";
import { EstoqueRepository } from "../repositories/estoqueRepository";

export class NotaFiscalService {
    private notaFiscalRepository = NotaFiscalRepository.getInstance();
    private clienteRepository = ClienteRepository.getInstance();
    private vendedorRepository = VendedorRepository.getInstance();
    private carroRepository = CarroRepository.getInstance();
    private estoqueRepository = EstoqueRepository.getInstance();

    // emitir a nota fiscal
    async emitirNota(dados: any): Promise<NotaFiscal> {

        //Se o número da nota não for fornecido, lança um erro
        if (!dados.numero_nota) {
            throw {
                status: 400,
                message: "Número da nota é obrigatório."
            };
        }
        // Campos obrigatórios
        if (
            !dados.numero_nota ||
            !dados.data_emissao ||
            dados.valor_total == null ||
            !dados.id_cliente ||
            !dados.id_vendedor ||
            !dados.id_carro
        ) {
            throw {
                status: 400,
                message: "Dados obrigatórios incompletos."
            };
        }

        // Número da nota duplicado
        const notaExistente =
            await this.notaFiscalRepository.buscarPorNumero(dados.numero_nota);

        if (notaExistente) {
            throw {
                status: 409,
                message: "Número da nota já cadastrado."
            };
        }

        // Cliente existe? Se não existir, lança erro
        const cliente =
            await this.clienteRepository.buscarClientePorId(dados.id_cliente);

        if (!cliente) {
            throw {
                status: 404,
                message: "Cliente não encontrado."
            };
        }

        // Vendedor existe? Se não existir, lança erro
        const vendedor =
            await this.vendedorRepository.buscarVendedorPorId(dados.id_vendedor);

        if (!vendedor) {
            throw {
                status: 404,
                message: "Vendedor não encontrado."
            };
        }

        // Carro existe? Se não existir, lança erro
        const carro =
            await this.carroRepository.buscarCarroPorId(dados.id_carro);

        if (!carro) {
            throw {
                status: 404,
                message: "Carro não encontrado."
            };
        }

        // Valor total deve ser maior que zero
        if (Number(dados.valor_total) <= 0) {
            throw {
                status: 400,
                message: "Valor total deve ser maior que zero."
            };
        }

        // Data de emissão não pode ser futura
        const data = new Date(dados.data_emissao);
        const hoje = new Date();

        if (data > hoje) {
            throw {
                status: 400,
                message: "A data de emissão não pode ser futura."
            };
        }

        // Estoque do carro deve ser verificado antes de emitir a nota
        const estoque =
            await this.estoqueRepository.buscarEstoquePorCarro(dados.id_carro);

        if (!estoque) {
            throw {
                status: 404,
                message: "Não existe estoque para este carro."
            };
        }

        if (estoque.quantidade <= 0) {
            throw {
                status: 400,
                message: "Carro indisponível em estoque."
            };
        }

        const nota = new NotaFiscal(
            null,
            dados.numero_nota,
            data,
            Number(dados.valor_total),
            dados.id_cliente,
            dados.id_vendedor,
            dados.id_carro
        );

        const notaInserida =
            await this.notaFiscalRepository.inserir(nota);

        // Atualiza estoque após a venda
        await this.estoqueRepository.decrementarQuantidade(dados.id_carro);

        return notaInserida;
    }

    // Buscar por ID
    async buscarNotaPorId(id_nota: number): Promise<NotaFiscal> {
        const nota = await this.notaFiscalRepository.buscarPorId(id_nota);
        if (!nota) {
            throw {
                status: 404,
                message: "Nota fiscal não encontrada."
            };
        }
        return nota;
    }

    //Listar todas as notas fiscais
    async listarNotas(): Promise<NotaFiscal[]> {
        return await this.notaFiscalRepository.buscarTodas();
    }

    //Listar notas fiscais por cliente
    async listarNotasPorCliente(id_cliente: number): Promise<NotaFiscal[]> {
        // Verifica se o cliente existe
        const cliente = await this.clienteRepository.buscarClientePorId(id_cliente);
        if (!cliente) {
            throw {
                status: 404,
                message: "Cliente não encontrado."
            };
        }
        return await this.notaFiscalRepository.buscarPorCliente(id_cliente);
    }

    //Listar notas fiscais por vendedor
    async listarNotasPorVendedor(id_vendedor: number): Promise<NotaFiscal[]> {
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

    //Listar notas fiscais por carro
    async listarNotasPorCarro(id_carro: number): Promise<NotaFiscal[]> {
        // Verifica se o carro existe
        const carro = await this.carroRepository.buscarCarroPorId(id_carro);
        if (!carro) {
            throw {
                status: 404,
                message: "Carro não encontrado."
            };
        }
        return await this.notaFiscalRepository.buscarPorCarro(id_carro);
    }

    // Nota fiscal não pode ser removida após a emissão
    async deletarNota(id_nota: number): Promise<void> {

        const nota = await this.notaFiscalRepository.buscarPorId(id_nota);

        if (!nota) {
            throw {
                status: 404,
                message: "Nota fiscal não encontrada."
            };
        }

        throw {
            status: 400,
            message: "Nota fiscal não pode ser deletada após a emissão."
        };
    }
}