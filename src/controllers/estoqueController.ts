import { Request, Response } from "express";
import { EstoqueService } from "../services/estoqueService";

export class EstoqueController {
//criando constante para acessar os dados de estoque
private estoqueService = new EstoqueService();

//POST - cadastrar estoque
    async cadastrarEstoque(req: Request, res: Response){
    try {
        // await aguarda a Promise do service resolver (operação no banco)
        const estoque = await this.estoqueService.cadastrarEstoque(req.body);

        //se deu certo, retorna status 201 com o estoque já com id gerado pelo banco
        return res.status(201).json(estoque);

    } catch (error: any) {
        const status = error.status ?? 500;
        return res.json({ erro: error.mensagem ?? "Erro interno do servidor." });
        };
    }

    //GET - listar estoque
async listarEstoque(req: Request, res: Response){
    try {
        //await aguarda retornar o array de estoques 
        const estoques = await this.estoqueService.listarEstoque();

        // deu certo → retorna 200 com a lista de estoques
        return res.status(200).json(estoques);

    } catch (error: any) {
        const status = error.status ?? 500;
        return res.json({ erro: error.mensagem ?? "Erro interno do servidor."});
    }
}
 

//GET - Buscar estoque por id
async buscarEstoque(req: Request, res: Response){
    try {
        //extrai o id dos parâmetros da requisição
        const id_estoque = Number(req.params.id_estoque);

        // await aguarda o banco retornar o estoque
        const estoque = await this.estoqueService.buscarEstoque(id_estoque);

        // deu certo, retorna 200 com o estoque encontrado
        return res.status(200).json(estoque);

    } catch (error: any) {
        const status = error.status ?? 500;
        return res.json({ erro: error.mensagem ?? "Erro interno do servidor."});
    }
}

//GET - Buscar estoque por carro
async buscarEstoquePorCarro(req: Request, res: Response){
    try {
        //extrai o id dos parâmetros da requisição
        const id_carro = Number(req.params.id_carro);

        // await aguarda o banco retornar o estoque do carro
        const estoque = await this.estoqueService.buscarEstoquePorCarro(id_carro);

        //deu certo, retorna 200 com o estoque encontrado
        return res.status(200).json(estoque);

    } catch (error: any) {
        const status = error.status ?? 500;
        return res.json({ erro: error.mensagem ?? "Erro interno do servidor."});
    }
}

//PUT - atualizar estoque
async atualizarEstoque(req: Request, res: Response){
    try {
        //extrai o id dos parâmetros da requisição
        const id_estoque = Number(req.params.id_estoque);

        // await aguarda o banco atualizar e retornar o estoque atualizado
        const estoque = await this.estoqueService.atualizarEstoque(
            id_estoque,
            req.body //apenas os campos que quer atualizar
        );

        //retorna 200 com o estoque atualizado
        return res.status(200).json(estoque);

    } catch (error: any) {
        const status = error.status ?? 500;
        return res.json({ erro: error.mensagem ?? "Erro interno do servidor."});
    }
}

//DELETE - deletar estoque
async deletarEstoque(req: Request, res: Response){
    try {
        //extrai o id do estoque dos parâmetros da requisição
        const id_estoque = Number(req.params.id_estoque);

        // await aguarda o banco deletar o estoque
        await this.estoqueService.deletarEstoque(id_estoque);

         // deu certo → retorna 200 com mensagem de sucesso
        return res.status(200).json({
            mensagem: "Estoque deletado com sucesso!"
        });

    } catch (error: any) {
        const status = error.status ?? 500;
        return res.json({ erro: error.mensagem ?? "Erro interno do servidor."});
    }
}

}
