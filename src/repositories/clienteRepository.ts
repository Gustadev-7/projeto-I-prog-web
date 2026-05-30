import {Cliente} from "../models/Cliente";

export class ClienteRepository{

    //criando instancia para não haver duplicidade de dados, garante apenas um repositório de clientes

    private static instance: ClienteRepository; 
    private clientetList: Cliente [] = [];
    
    private constructor () {}

    public static getInstance(): ClienteRepository{
        if(!this.instance){
            this.instance = new ClienteRepository ();
        }
        return this.instance
    }

    //inserindo cliente no array de clientes
    insereCliente(clientes: Cliente){
        this.clientetList.push(clientes)
    }

    //filtrando por id
    listarClientePorId(id_cliente: Number): Cliente | undefined{
        return this.clientetList.find(clientes => clientes.id_cliente === id_cliente);
    }

    //filtrando por CPF 
    listarClientePorCPF(CPF: string): Cliente | undefined{
        return this.clientetList.find(clientes => clientes.CPF === CPF);
    }

    //filtrando todos os clientes 
    listarTodosClientes(): Cliente []{
        return this.clientetList;
    }

    //atualizando cliente por id, atualização parcial dos dados 
    atualizaCliente(id_cliente: Number, dados: Partial<Cliente>): Cliente | undefined{
        const cliente = this.clientetList.find(clientes => clientes.id_cliente === id_cliente);

        if(!cliente) return undefined;

        Object.assign(cliente, dados);
        return cliente; 
    }
 
    //Deletando cliente
    deletaCliente(id_cliente: Number): Cliente | undefined{
        const clienteIndex = this.clientetList.findIndex(clientes => clientes.id_cliente === id_cliente);
        if(clienteIndex === -1) return undefined;

        const clienteDeletado = this.clientetList[clienteIndex]; // guardando o cliente deletado para retornar depois

        this.clientetList.splice(clienteIndex, 1); 

        return clienteDeletado; 
        
    }

}