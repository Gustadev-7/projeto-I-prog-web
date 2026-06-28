import { Cliente } from "../model/Cliente";
import { ClienteRepository } from "../repositories/clienteRepository";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";

export class ClienteService {

    private clienteRepository = ClienteRepository.getInstance();
    private notaFiscalRepository = NotaFiscalRepository.getInstance();

    // Cadastrar cliente
    async cadastrarCliente(dados: any): Promise<Cliente> {

        // Validação dos campos obrigatórios
        if (!dados.nome || !dados.cpf || !dados.telefone) {
            throw {
                status: 400,
                message: "Dados obrigatórios incompletos."
            };
        }

        // Verifica CPF duplicado
        const clienteExistente = await this.clienteRepository.buscarClientePorCPF(dados.cpf);

        if (clienteExistente) {
            throw {
                status: 409,
                message: "CPF já cadastrado."
            };
        }

        const cliente = new Cliente(
            null,
            dados.nome,
            dados.cpf,
            dados.telefone,
            dados.email ?? null,
            dados.cidade ?? null
        );

        return await this.clienteRepository.inserirCliente(cliente);
    }

    // Buscar cliente por ID
    async buscarCliente(id_cliente: number): Promise<Cliente> {

        const cliente = await this.clienteRepository.buscarClientePorId(id_cliente);

        if (!cliente) {
            throw {
                status: 404,
                message: "Cliente não encontrado."
            };
        }

        return cliente;
    }

    // Buscar cliente por CPF
    async buscarClientePorCPF(cpf: string): Promise<Cliente> {

        const cliente = await this.clienteRepository.buscarClientePorCPF(cpf);

        if (!cliente) {
            throw {
                status: 404,
                message: "Cliente não encontrado."
            };
        }

        return cliente;
    }

    // Listar clientes
    async listarClientes(): Promise<Cliente[]> {
        return await this.clienteRepository.buscarTodosClientes();
    }

    // Listar notas fiscais por cliente
    async listarNotasPorCliente(id_cliente: number): Promise<any[]> {
        const cliente = await this.clienteRepository.buscarClientePorId(id_cliente);

        if (!cliente) {
            throw {
                status: 404,
                message: "Cliente não encontrado."
            };
        }

        const notas = await this.notaFiscalRepository.buscarPorCliente(id_cliente);

        if (!notas || notas.length === 0) {
            throw {
                status: 404,
                message: "Nenhuma nota fiscal encontrada para este cliente."
            };
        }

        return notas;
    }

    // Atualizar cliente
    async atualizarCliente(
        id_cliente: number,
        dadosAtualizados: Partial<Cliente>
    ): Promise<Cliente> {

        // Verifica se o cliente existe
        const clienteExistente =
            await this.clienteRepository.buscarClientePorId(id_cliente);

        if (!clienteExistente) {
            throw {
                status: 404,
                message: "Cliente não encontrado."
            };
        }

        // Validar CPF duplicado
        if (dadosAtualizados.cpf) {

            const cpfExistente =
                await this.clienteRepository.buscarClientePorCPF(
                    dadosAtualizados.cpf
                );

            if (
                cpfExistente &&
                Number(cpfExistente.id_cliente) !== id_cliente
            ) {
                throw {
                    status: 409,
                    message: "CPF já cadastrado para outro cliente."
                };
            }
        }

        const clienteAtualizado =
            await this.clienteRepository.atualizarCliente(
                id_cliente,
                dadosAtualizados
            );

        if (!clienteAtualizado) {
            throw {
                status: 404,
                message: "Cliente não encontrado."
            };
        }

        return clienteAtualizado;
    }

    // Deletar cliente
    async deletarCliente(id_cliente: number): Promise<void> {

        const cliente =
            await this.clienteRepository.buscarClientePorId(id_cliente);

        if (!cliente) {
            throw {
                status: 404,
                message: "Cliente não encontrado."
            };
        }

        // Verifica notas fiscais vinculadas
        const notas =
            await this.notaFiscalRepository.buscarPorCliente(id_cliente);

        if (notas.length > 0) {
            throw {
                status: 409,
                message: "Cliente possui notas fiscais associadas."
            };
        }

        await this.clienteRepository.deletarCliente(id_cliente);
    }
}