import { Request, Response } from "express";
import { VendedorService } from "../services/vendedorService";

export class VendedorController {

    private vendedorService = new VendedorService();

// POST - Cadastrar vendedor
async cadastrarVendedor(req: Request, res: Response) {
    try {
        // await aguarda a Promise do service resolver (operação no banco)
        const novoVendedor = await this.vendedorService.cadastrarVendedor(req.body);

        // deu certo, retorna status 201 com o vendedor já com id gerado pelo banco
        return res.status(201).json(novoVendedor);

    }catch (error: any) {
        const status = error.status ?? 500;
        return res.status(status).json({ erro: error.mensagem ?? "Erro interno do servidor."})
    }
}

// GET - Listar todos os vendedores
async listarVendedores(req: Request, res: Response) {
    try {
        //await aguarda o banco retornar o array de vendedores
        const vendedores = await this.vendedorService.listarVendedores();

        // deu certo → retorna 200 com a lista de vendedores
        return res.status(200).json(vendedores);

    } catch (error: any) {
        const status = error.status ?? 500;
        return res.status(status).json({ erro: error.mensagem ?? "Erro interno do servidor"})
    }
}


// GET - Buscar vendedor por ID
async buscarVendedor(req: Request, res: Response) {
    try {

        // extrai o id do vendedor dos parâmetros da requisição
        const { id_vendedor } = req.params;

        //await aguarda o banco retornar o vendedor
        const vendedor = await this.vendedorService.buscarVendedor(
            Number(id_vendedor)
        );

        // deu certo, retorna status 200 com o vendedor encontrado
        return res.status(200).json(vendedor);

    } catch (error: any) {
        const status = error.status ?? 500;
        return res.status(status).json({ erro: error.mensagem ?? "Erro interno do servidor."});
    }
} 


// GET - Listar notas fiscais por vendedor
async listarNotasPorVendedor(req: Request, res: Response) {
    try {
        // extrai o id do vendedor dos parâmetros da requisição
        const { id_vendedor } = req.params;

        // await aguarda o banco retornar as notas do vendedor
        const notas = await this.vendedorService.listarNotasPorVendedor(Number(id_vendedor));

        // deu certo, retorna status 200 com as notas encontradas
        return res.status(200).json(notas);

    } catch (error: any) {
        const status = error.status ?? 500;
        return res.status(status).json({ erro: error.mensagem ?? "Erro interno do servidor."});
    }
}

// PUT - Atualizar vendedor
async atualizarVendedor(req: Request, res: Response) {
    try {

        // extrai o id do vendedor dos parâmetros da requisição
        const { id_vendedor } = req.params;

        // await aguarda o banco atualizar e retornar o vendedor atualizado
        const vendedorAtualizado = await this.vendedorService.atualizarVendedor(Number(id_vendedor),req.body);

        // deu certo, retorna status 200 com o vendedor atualizado
        return res.status(200).json(vendedorAtualizado);

    } catch (error: any) {
        const status = error.status ?? 500;
        return res.status(status).json({ erro: error.mensagem ?? "Erro interno do servidor."});
    }

}


// DELETE - Deletar vendedor
async deletarVendedor(req: Request, res: Response) {
    try {

        // extrai o id do vendedor dos parâmetros da requisição
        const { id_vendedor } = req.params;

        // await aguarda o banco deletar o vendedor
        await this.vendedorService.deletarVendedor(Number(id_vendedor));

        // deu certo, retorna status 200 com a mensagem
        return res.status(200).json({
            message: "Vendedor deletado com sucesso"
        });

    } catch (error: any) {
        const status = error.status ?? 500;
        return res.status(status).json({ erro: error.mensagem ?? "Erro interno do servidor."})
    }
}

}

