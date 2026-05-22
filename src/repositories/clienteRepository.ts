import { ClientRequest } from "node:http";
import {Cliente} from "../models/Cliente";

export class ClienteRepository{
    private static instance: ClienteRepository; 
    private clientetList: Cliente [] = [];
    
    private constructor () {}

    public static getInstance(): ClienteRepository{
        if(!this.instance){
            this.instance = new ClienteRepository ();
        }
        return this.instance
    }

    insereCliente(clientes: Cliente){
        this.clientetList.push(clientes)
    }

    filtraClientePorId(id_cliente: Number): Cliente | undefined{
        return this.clientetList.find(clientes => clientes.id_cliente === id_cliente);
    }
}