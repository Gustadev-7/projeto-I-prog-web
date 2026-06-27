import { Request, Response } from "express";
import { EstoqueService } from "../services/estoqueService";

//criando constante para acessar os dados de estoque
const estoqueService = new EstoqueService();

//POST - cadastrar estoque
export function cadastrarEstoque(req: Request, res: Response): void {
    try {
        //usando os dados da requisição e enviando para o service para cadastrar
        const estoque = estoqueService.cadastrarEstoque(req.body);

        //se deu certo, retorna status 201 e mensagem de sucesso
        res.status(201).json({
            mensagem: "Estoque cadastrado com sucesso",
            estoque
        });

    } catch (e: any) {
        res.status(e.status || 500).json({
            mensagem: e.message
        });
    }
}

//GET - Buscar estoque por id
export function buscarEstoque(req: Request, res: Response): void {
    try {
        //extrai o id dos parâmetros da requisição
        const id_estoque = Number(req.params.id_estoque);

        const estoque = estoqueService.buscarEstoque(id_estoque);

        res.status(200).json({
            mensagem: "Estoque encontrado com sucesso",
            estoque
        });

    } catch (e: any) {
        res.status(e.status || 500).json({
            mensagem: e.message
        });
    }
}

//GET - Buscar estoque por carro
export function buscarEstoquePorCarro(req: Request, res: Response): void {
    try {
        //extrai o id dos parâmetros da requisição
        const id_carro = Number(req.params.id_carro);

        const estoque = estoqueService.buscarEstoquePorCarro(id_carro);

        res.status(200).json({
            mensagem: "Estoque encontrado com sucesso",
            estoque
        });

    } catch (e: any) {
        res.status(e.status || 500).json({
            mensagem: e.message
        });
    }
}

//PUT - atualizar estoque
export function atualizarEstoque(req: Request, res: Response): void {
    try {
        //extrai o id dos parâmetros da requisição
        const id_estoque = Number(req.params.id_estoque);

        const estoque = estoqueService.atualizarEstoque(
            id_estoque,
            req.body
        );

        res.status(200).json({
            mensagem: "Estoque atualizado com sucesso!",
            estoque
        });

    } catch (e: any) {
        res.status(e.status || 500).json({
            mensagem: e.message
        });
    }
}

//GET - listar estoque
export function listarEstoque(req: Request, res: Response): void {
    try {
        //chama o serviço para listar o estoque
        const estoques = estoqueService.listarEstoque();

        res.status(200).json({
            mensagem: "Estoque listado com sucesso",
            estoques
        });

    } catch (e: any) {
        res.status(e.status || 500).json({
            mensagem: e.message
        });
    }
}

//DELETE - deletar estoque
export function deletarEstoque(req: Request, res: Response): void {
    try {
        //extrai o id do estoque dos parâmetros da requisição
        const id_estoque = Number(req.params.id_estoque);

        //chama o service para deletar o estoque
        estoqueService.deletarEstoque(id_estoque);

        res.status(200).json({
            mensagem: "Estoque deletado com sucesso!"
        });

    } catch (e: any) {
        res.status(e.status || 500).json({
            mensagem: e.message
        });
    }
}