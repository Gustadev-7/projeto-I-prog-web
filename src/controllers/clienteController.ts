import {Request, Response} from "express";
import {ClienteService} from "../services/clienteService";

//Cria uma instancia para usar os métodos, a lógica do négocio (no caso o service)
const clienteService = new ClienteService();

// POST - Cadastrar cliente 
export function cadastrarCliente(req: Request, res:Response){

    try{
        //usando os dados da requisição e manda para o service
        const novocliente = clienteService.cadastrarCliente(req.body);

        //deu certo, retorna o status 201
        res.status(201).json(
        {
            mensagem: "Cliente cadastrado com sucesso!",
            cliente: novocliente
        }  
    );
    //se der errado, retorna status 400 e a mensagem de erro
}catch(error: any){
    res.status(400).json({message: error.message});
}
}

// GET - Buscar cliente por id ou CPF 
export function buscarCliente(req: Request, res:Response){
    try{
        //extrai o id_cliente e CPF da query da requisição
        const{id_cliente, CPF} = req.query as {id_cliente?: string, CPF?: string};
        
        const cliente = clienteService.buscarCliente(
            id_cliente ? Number(id_cliente): undefined, //converto para number se id_cliente existir
            CPF 
        )
        res.status(200).json({ message: "Cliente encontrado com sucesso!", cliente})
    }catch(e: unknown){
        res.status(400).json({message:(e as Error).message})
}
}

//
