import { ClienteRepository } from "../repositories/clienteRepository";
import { Cliente } from "../models/Cliente";

export class ClienteService {

    ClienteRepository: ClienteRepository = ClienteRepository.getInstance();

    //Criando cliente 
    cadastrarCliente(dados: any): Cliente {

        //Validação dos dados obrigatórios
        if(!dados.nome || !dados.CPF || !dados.telefone ){
            throw new Error("Dados obrigatórios incompletos");
        }

        //Clientes com o mesmo CPF não podem ser cadastrados
        if(this.ClienteRepository.filtraClientePorCPF(dados.CPF)){
            throw new Error("CPF já cadastrado");
        }

        //criando o cliente com os dados da requisição '
        const cliente = new Cliente(
            dados.nome,
            dados.CPF,
            dados.telefone,
            dados.email,
            dados.cidade
        );

        //inserimos o cliente no reppsitótio, guarda no array de clientes 
        this.ClienteRepository.insereCliente(cliente); 
        return cliente;
    }

    //Buscar cliente 
    buscarCliente(id_cliente?: number, CPF?: string): Cliente{
       
        if(!id_cliente && !CPF){
            throw new Error("Informe id ou  CPF para busca do cliente");
        }

        //Busca por ternário, como se fosse if (se não achar por id, busca por CPF)
        const cliente = id_cliente ? this.ClienteRepository.filtraClientePorId(id_cliente) : this.ClienteRepository.filtraClientePorCPF(CPF!);

        if(!cliente){
            throw new Error("Cliente não encontrado");
        }

        return cliente;
    }
    
    //Atualizar cliente 
    atualizarCliente(id_cliente: number, dados: any): Cliente {

        //verifica se a atualização do CPF é um CPF que já temos 
        if(dados.CPF){
            const clienteExistente = this.ClienteRepository.filtraClientePorCPF(dados.CPF);
        
            //se o cpf já existir e for diferente do cliente que estamos atualizando
            if(clienteExistente && clienteExistente.id_cliente !== id_cliente){
                throw new Error("CPF já cadastrado para outro cliente");
            }
        }
            const clienteAtualizado = this.ClienteRepository.atualizaCliente(id_cliente, dados); 

            if(!clienteAtualizado){
                throw new Error("Cliente não encontrado!");
        }
        return clienteAtualizado;
    }
}