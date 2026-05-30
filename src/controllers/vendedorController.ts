import { Request, Response } from "express";
import { VendedorService } from "../services/vendedorService";

const vendedorService = new VendedorService();

// POST - Cadastrar vendedor
export function cadastrarVendedor(req: Request, res: Response) {
    try {
        //chama o serviço para cadastrar o vendedor, passando os dados da requisição
        const novoVendedor = vendedorService.cadastrarVendedor(req.body);

        //retorna a resposta com o vendedor cadastrado
        res.status(201).json({
            message: "Vendedor cadastrado com sucesso",
            vendedor: novoVendedor
        });
        //caso ocorra algum erro, retorna a resposta com o status 400 e a mensagem de erro
    } catch (error: any) {

        //retorna a resposta com o status 400 e a mensagem de erro
        res.status(400).json({ error: error.message });
    }
}

// GET - Listar todos os vendedores
export function listarVendedores(req: Request, res: Response){
    try{
        const vendedores = vendedorService.listarVendedores();

        res.status(200).json({
            message: "Vendedores listados com sucesso",
            vendedores
        });
    }catch (e: unknown) {
        res.status(400).json({message: (e as Error).message});
    }
}

// GET - Buscar vendedor por ID
export function buscarVendedor(req: Request, res: Response) {
    try{

        //extrai o id do vendedor dos parâmetros da requisição,e chama o serviço para buscar o vendedor, passando o id do vendedor
        const {id_vendedor} = req.params;

        const vendedor = vendedorService.buscarVendedor(Number(id_vendedor));

        res.status(200).json({
            message: "Vendedor encontrado com sucesso",
            vendedor
        });

    } catch (e: unknown) {
        res.status(400).json({message: (e as Error).message});
    }
}

// PUT - Atualizar vendedor
export function atualizarVendedor(req: Request, res: Response) {
    try{
        //extrai o id do vendedor dos parâmetros da requisição
        const{ id_vendedor } = req.params;
        const vendedorAtualizado = vendedorService.atualizarVendedor(Number(id_vendedor), req.body);

        res.status(200).json({
            message: "Vendedo atualizado com sucesso",
            vendedor: vendedorAtualizado
        })
    }catch (e: unknown) {
        //retorna a resposta com o status 400 e a mensagem de erro
        res.status(400).json({message: (e as Error).message});
    }
}

// DELETE - Deletar vendedor
export function deletarVendedor(req: Request, res: Response){
    try{

        const { id_vendedor } = req.params;
        vendedorService.deletarVendedor(Number(id_vendedor));

        res.status(200).json({
            message: "Vendedor deletado com sucesso"
        })

    } catch (e: unknown) {
        res.status(400).json({message: (e as Error).message});

    }
}

//GET - listar notas fiscais por vendedor
export function listarNotasPorVendedor(req: Request, res: Response){
    try{

        const { id_vendedor } = req.params;
        const notas = vendedorService.notaFiscalRepository.filtrarNotasVendedor(Number(id_vendedor));

        res.status(200).json({
            message: "Notas fiscais listadas com sucesso",
            notas
        });
    }catch (e: unknown) {
        res.status(400).json({message: (e as Error).message});
    }
}