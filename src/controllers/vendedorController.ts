import { Request, Response } from "express";
import { VendedorService } from "../services/vendedorService";

const vendedorService = new VendedorService();

// POST - Cadastrar vendedor
export function cadastrarVendedor(req: Request, res: Response) {
    try {
        // chama o serviço para cadastrar o vendedor
        const novoVendedor = vendedorService.cadastrarVendedor(req.body);

        res.status(201).json({
            message: "Vendedor cadastrado com sucesso",
            vendedor: novoVendedor
        });

    } catch (error: any) {
        res.status(error.status || 500).json({
            message: error.message
        });
    }
}

// GET - Listar todos os vendedores
export function listarVendedores(req: Request, res: Response) {
    try {
        const vendedores = vendedorService.listarVendedores();

        res.status(200).json({
            message: "Vendedores listados com sucesso",
            vendedores
        });

    } catch (e: any) {
        res.status(e.status || 500).json({
            message: e.message
        });
    }
}

// GET - Buscar vendedor por ID
export function buscarVendedor(req: Request, res: Response) {
    try {

        // extrai o id do vendedor dos parâmetros da requisição
        const { id_vendedor } = req.params;

        const vendedor = vendedorService.buscarVendedor(
            Number(id_vendedor)
        );

        res.status(200).json({
            message: "Vendedor encontrado com sucesso",
            vendedor
        });

    } catch (e: any) {
        res.status(e.status || 500).json({
            message: e.message
        });
    }
}

// PUT - Atualizar vendedor
export function atualizarVendedor(req: Request, res: Response) {
    try {

        // extrai o id do vendedor dos parâmetros da requisição
        const { id_vendedor } = req.params;

        const vendedorAtualizado =
            vendedorService.atualizarVendedor(
                Number(id_vendedor),
                req.body
            );

        res.status(200).json({
            message: "Vendedor atualizado com sucesso",
            vendedor: vendedorAtualizado
        });

    } catch (e: any) {
        res.status(e.status || 500).json({
            message: e.message
        });
    }
}

// DELETE - Deletar vendedor
export function deletarVendedor(req: Request, res: Response) {
    try {

        const { id_vendedor } = req.params;

        vendedorService.deletarVendedor(
            Number(id_vendedor)
        );

        res.status(200).json({
            message: "Vendedor deletado com sucesso"
        });

    } catch (e: any) {
        res.status(e.status || 500).json({
            message: e.message
        });
    }
}

// GET - Listar notas fiscais por vendedor
export function listarNotasPorVendedor(req: Request, res: Response) {
    try {

        const { id_vendedor } = req.params;

        const notas =
            vendedorService.notaFiscalRepository
                .filtrarNotasVendedor(Number(id_vendedor));

        res.status(200).json({
            message: "Notas fiscais listadas com sucesso",
            notas
        });

    } catch (e: any) {
        res.status(e.status || 500).json({
            message: e.message
        });
    }
}