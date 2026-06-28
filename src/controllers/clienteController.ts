import {Request, Response} from "express";
import {ClienteService} from "../services/clienteService";

export class ClienteController{
    //Cria uma instancia para usar os métodos, a lógica do négocio (no caso o service)
    private clienteService = new ClienteService();

// POST - Cadastrar cliente 
    async criarCliente(req: Request, res:Response){

    try{
        //usando os dados da requisição.  await aguarda a Promise do service resolver (operação no banco)
        const novocliente =  await this.clienteService.criarCliente(req.body);
        //deu certo, retorna o status 201 ja com id gerado pelo banco
        return res.status(201).json(novocliente)
    //se der errado, retorna status 400 e a mensagem de erro
    }catch(error: any){
        const status = error.status ?? 500; //se não tiver status definido assume erro interno do servidor
        return res.status(status).json({message: error.message ?? "Erro interno do servidor."});
}
}


    //GET - Listar todos os clientes
async listarClientes(req: Request, res: Response){
    try{
        //listando os clientes só chama o service e aguarda o array do banco
        const clientes = await this.clienteService.listarClientes();
        // deu certo → retorna 200 com a lista de clientes
        return res.status(200).json(clientes);

    }catch(error: any){ 
        const status = error.status ?? 500;
        //em caso de erro
        return res.status(status).json({erro: error.mensagem ?? "Erro interno do servidor."});
    }
}

    // GET - Buscar cliente por id
    async buscarClientePorId(req: Request, res: Response){
    try{
        //dados recebidos da requisição e converte para number
        const id_cliente = Number(req.params.id);

         // await aguarda o banco retornar o cliente
        const cliente = await this.clienteService.buscarCliente(id_cliente);
        
        //deu certo, retorna status 200 e o cliente encontrado
        return res.status(200).json(cliente);

    }catch(error: any){
        const status = error.status ?? 500;
        return res.status(status).json({ message: error.message ?? "Erro interno do servidor." }); 
    }
}

    //Listar notas fiscais por cliente
    async listarNotasPorCliente(req: Request, res: Response){
    try{
        //dados recebidos da requisição e converte para number
        const id_cliente = Number(req.params.id_cliente);

        // await aguarda o banco retornar as notas do cliente
        const notas = await this.clienteService.listarNotasPorCliente(id_cliente);

        //deu certo, retorna status 200 e as notas encontradas
        return res.status(200).json(notas);
    }catch(error: any){
        const status = error.status ?? 500;
        return res.status(status).json({ erro: error.mensagem ?? "Erro interno do servidor." });
    }
}

    //PUT - Atualizar cliente por id 
    async atualizarCliente(req: Request, res: Response){
    try{
        //*req.params recebe o id da URL converte para number
        const id_cliente = Number(req.params.id_cliente); 

        //re.body dados novos da requisição para atualizar o cliente, await aguarda o banco atualizar e retornar o cliente atualizado
        const cliente = await this.clienteService.atualizarCliente(id_cliente, req.body); 

        //deu certo, retorna status 200 e o cliente atualizado
        return res.status(200).json(cliente);

    }catch(error: any){
        const status = error.status ?? 500;
        return res.status(status).json({ erro: error.mensagem ?? "Erro interno do servidor." });
    }
}


    //DELETE - Deletar cliente por id 
    async deletarCliente(req: Request, res: Response){
    try{
        //dados recebidos da requisição e converte para number 
        const id_cliente = Number(req.params.id_cliente);

        // await aguarda o banco deletar o cliente
        await this.clienteService.deletarCliente(id_cliente);

        //deu certo, retorna status 200 e mensagem de sucesso
        return res.status(200).json({
            message: "Cliente deletado com sucesso!"
        })

    }catch (error: any){
        // se tiver notas vinculadas o service lança { status: 422, mensagem: '...' }
        const status = error.status ?? 500;
        return res.status(status).json({ erro: error.mensagem ?? "Erro interno do servidor." });
    }
}

}