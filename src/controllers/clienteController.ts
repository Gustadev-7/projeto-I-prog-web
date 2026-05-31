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

//GET - Listar todos os clientes
export function listarClientes(req: Request, res: Response){
    try{
        //listando os clientes usando service 
        const clientes = clienteService.listarClientes();

        //deu certo
        res.status(200).json(clientes);
    }catch(e: unknown){ 
        //em caso de erro
        res.status(400).json({message:(e as Error).message})
    }
}

//PUT - Atualizar cliente por id 
export function atualizarCliente(req: Request, res: Response): void{
    try{
        //*req.params recebe o id da URL converte para number
        const id_cliente = Number(req.params.id_cliente); 

        //re.body dados novos da requisição para atualizar o cliente
        const cliente = clienteService.atualizarCliente(id_cliente, req.body); 

        res.status(200).json({message: "Cliente atualizado com sucesso!", cliente});
    }catch(e: unknown){
        res.status(400).json({
            message:(e as Error).message
        })
    }
}

//DELETE - Deletar cliente por id 
export function deletarCliente(req: Request, res: Response): void {
    try{
        //dados recebidos da requisição e converte para number 
        const id_cliente = Number(req.params.id_cliente);

        //chama service para deletar o cliente
        clienteService.deletarCliente(id_cliente);

        //deu certo, retorna status 200 e mensagem de sucesso
        res.status(200).json({
            message: "Cliente deletado com sucesso!"
        })
    }catch (e: unknown){
        res.status(400).json({
            message: (e as Error).message
        })
    }
}
