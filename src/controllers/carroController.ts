import { Request, Response } from "express";
import { CarroService } from "../services/carroService";
import { stat } from "node:fs";

export class CarroController {

private carroService = new CarroService(); //Cria uma instancia para usar os métodos

    // POST - Cadastrar carro
    async cadastrarCarro(req: Request, res: Response) {
    try {
        //re.body contém os dados da requisição e o wai aguarda a Promise do service resolver (operação no banco)
        const novoCarro = await this.carroService.cadastrarCarro(req.body); // Usando os dados da requisição e manda para o service

        // Caso de certo, retorna o status 201 e a mensagem
        return res.status(201).json(novoCarro);

      // Caso não, pega o status do erro jogado pelo Service (400, 409) ou assume 500
    } catch (error: any) {
        const status = error.status ?? 500;
        return res.status(status).json({ erro: error.message ?? "Erro interno do servidor." });
    }
}

    // GET - Listar todos os carros
    async listarCarros(req: Request, res: Response) {
    try {
        // await aguarda o banco retornar o array de carros
        const carros = await this.carroService.listarCarros();

        
        return res.status(200).json(carros);

      // Caso não, pega o status do erro jogado pelo Service (400, 409) ou assume 500  
    } catch (error: any) {
        const status = error.status ?? 500;
        return res.status(status).json({ erro: error.message ?? "Erro interno do servidor." });
    }
}


    //GET - listar carrosdisponiveis 
    async listarCarrosDisponiveis(req: Request, res: Response){
    try{
        // await aguarda o banco retornar apenas os carros com estoque disponível
        const carros = await this.carroService.listarCarrosDisponiveis();

        // deu certo → retorna 200 com a lista de carros disponíveis
        return res.status(200).json(carros);
    }catch(error: any){
        const status = error.status ?? 500;
        return res.status(status).json({ erro: error.message ?? "Erro interno do servidor." });
    }
}


// GET - Buscar carro por ID
    async buscarCarroPorId(req: Request, res: Response) {
    try {
        //convert string da url para number
        const id = Number(req.params.id); // Extrai o id dos parâmetros da URL

        // await aguarda o banco retornar o carro);
        const carro = await this.carroService.buscarCarro(id);  

        return res.status(200).json(carro); // Caso de certo, retorna o status 200 e o carro encontrado

      // Caso não encontre, trata o erro 404  
    } catch (error: any) {
        const status = error.status ?? 500;
        return res.status(status).json({ erro: error.message ?? "Erro interno do servidor." });
    }
}


    // PUT - Atualizar dados do carro
    async atualizarCarro(req: Request, res: Response) {
    try {
        const id = Number(req.params.id); // Extrai o id dos parâmetros da URL

        // await aguarda o banco atualizar e retornar o carro atualizado
        const carroAtualizado = await this.carroService.atualizarCarro(id, req.body); 

        // Caso de certo, retorna o status 200 com o carro atualizado
        return res.status(200).json(carroAtualizado);

      // Caso não de certo, trata o erro 404 
    } catch (error: any) {
        const status = error.status ?? 500;
        return res.status(status).json({ erro: error.message ?? "Erro interno do servidor."});
    }
}

// DELETE - Deletar um carro
async deletarCarro(req: Request, res: Response) {
    try {
        const id = Number(req.params.id); // Extrai o id dos parâmetros da URL

         // await aguarda o banco deletar o carro e não retorna o carro pois foi removido
        await this.carroService.deletarCarro(id); 

        // Caso de certo, retorna o status 200 e a mensagem
        return res.status(200).json({
            mensagem: "Carro removido com sucesso!"
        });

      // Caso não de certo, trata o 404 ou 422 (regra do estoque)
    } catch (error: any) {
        const status = error.status ?? 500;
        return res.status(status).json({ erro: error.message ?? "Erro interno do servidor." });
    }
}

}



