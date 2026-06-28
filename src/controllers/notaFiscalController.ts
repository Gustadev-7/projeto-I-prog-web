import {Request, Response} from "express";
import {NotaFiscalService} from "../services/notaFiscalService";

export class NotaFiscalController{

//Instancia do service para usar os metodos 
private notaFiscalService = new NotaFiscalService();

//POST - emitir nota fiscal
async emitirNota(req: Request, res: Response){
    try{
        //usando os dados da requisição await aguarda a Promise do service resolver (operação no banco)
        const novaNota = await this.notaFiscalService.emitirNota(req.body);

        //deu certo, retorna status 201 com a nota já com id gerado pelo banco
        return res.status(201).json(novaNota);

        //se der errado, retorna status 400 e a mensagem de erro
    }catch(error: any){
        res.status(error.status ?? 500);
        return res.json({ erro: error.mensagem ?? "Erro interno do servidor."});
    }
}

//GET - listar todas as notas fiscais 
async listarNotas(req: Request, res: Response){
    try{
        //acessa repositorio de notas e retorna todas
        const notas = await this.notaFiscalService.listarNotas();

        return res.status(200).json(notas);

    }catch(error: any){
        res.status(error.status ?? 500);
        return res.json({ erro: error.mensagem ?? "Erro interno do servidor."})
    }
}

//GET - buscar nota por id
async buscarNotaPorId(req: Request, res: Response){
    try{
        //recebe o id da nota pelos parâmetros da URL
        const id_nota = Number(req.params.id_nota);

        // await aguarda o banco retornar a nota
        const nota = await this.notaFiscalService.buscarNotaPorId(id_nota);

        //deu certo, retorna status 200 com a nota encontrada
        return res.status(200).json(nota);

    }catch(error: any){
        res.status(error.status ?? 500);
        return res.json({ erro: error.mensagem ?? "Erro interno do servidor."});

    }
}


//GET - Listar notas por cliente 
async listarNotasPorCliente(req: Request, res: Response){
    try{

        const id_cliente = Number(req.params.id);

        const notas =await this.notaFiscalService.listarNotasPorCliente(id_cliente);

        return res.status(200).json(notas);

    }catch(error: any){
        res.status(error.status ?? 500);
        return res.json({ erro: error.mensagem ?? "Erro interno do servidor."});
    }
}

//GET - listar notas por vendedor 
async listarNotasPorVendedor(req: Request, res: Response){
    try{
        //recebe dados da requisção convertendo para number 
        const id_vendedor = Number(req.params.id);

        // await aguarda o banco retornar as notas do vendedor 
        const notas = await this.notaFiscalService.listarNotasPorVendedor(id_vendedor);

        //retorna 200 com o array de notas
        return res.status(200).json(notas);

    }catch(error: any){
        res.status(error.status ?? 500);
        return res.json({ erro: error.mensagem ?? "Erro interno do servidor."});
    }
}

//DELETE - deletar nota fiscal 
async deletarNota(req: Request, res: Response){
    try{
        //usando o id que vem na URL
        const id_nota = Number(req.params.id_nota);

        //sempre teremos o erro, pois não podemos deletar nota
       await this.notaFiscalService.deletarNota(id_nota);

    }catch (error: any){
        const status = error.status ?? 422;
        return res.status(status).json({ erro: error.mensagem ?? "Erro interno do servidor."});  
    }
}

}
