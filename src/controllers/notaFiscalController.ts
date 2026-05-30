import {Request, Response} from "express";
import {NotaFiscalService} from "../services/notaFiscalService";

//Instancia do service para usar os metodos 
const notaFiscalService = new NotaFiscalService();

//POST - emitir nota fiscal
export function emitirNota(req: Request, res: Response){
    try{
        //usando os dados da requisição 
        const novaNota = notaFiscalService.emitirNota(req.body);

        //deu certo, retorna status 201
        res.status(201).json({
            message: "Nota fiscal emitida com sucesso!", 
            notaFiscal: novaNota //retorna
        });
    }catch(e: unknown){
        res.status(400).json({message: (e as Error).message});
    }
}

//GET - Listar notas por cliente 
export function listarNotasPorCliente(req: Request, res: Response){
    try{
        //recebe dados da requisção (query por ser filtro - pode vir ou não)
        const id_cliente = Number(req.query.id_cliente);

        //retorna um array de notas fiscais do client 
        const notas = notaFiscalService.listarNotasPorCliente(id_cliente);

        res.status(200).json(notas);
    }catch(e: unknown){
        res.status(400).json({message: (e as Error).message});
    }
}

//GET - listar notas por vendedor 
export function listarNotasPorVendedor(req: Request, res: Response){
    try{
        //recebe dados da requisção (query por ser filtro - pode vir ou não)
        const id_vendedor = Number(req.query.id_vendedor);

         //retorna um array de notas fiscais do client 
        const notas = notaFiscalService.listarNotasPorVendedor(id_vendedor);

        res.status(200).json(notas);
    }catch(e: unknown){
        res.status(400).json({message: (e as Error).message});
    }
}


//DELETE - deletar nota fiscal 
export function deletarNota(req: Request, res: Response){
    try{
        //usando o id que vem na URL
        const id_nota = Number(req.params.id_nota);

        //sempre teremos o erro, pois não podemos deletar nota
        notaFiscalService.deletarNota(id_nota)
    }catch (e: unknown){
        res.status(400).json({message: (e as Error).message});
    }
}