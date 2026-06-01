import { Request, Response } from "express";
import { CarroService } from "../services/carroService";
import { stat } from "node:fs";

const carroService = new CarroService(); //Cria uma instancia para usar os métodos

// POST - Cadastrar carro
export function cadastrarCarro(req: Request, res: Response) {
    try {
        const novoCarro = carroService.cadastrarCarro(req.body); // Usando os dados da requisição e manda para o service

        // Caso de certo, retorna o status 201 e a mensagem
        res.status(201).json({
            mensagem: "Carro cadastrado com sucesso!",
            carro: novoCarro
        });
      // Caso não, pega o status do erro jogado pelo Service (400, 409) ou assume 500
    } catch (error: any) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message || "Erro interno do servidor." });
    }
}

// GET - Listar todos os carros
export function listarCarros(req: Request, res: Response) {
    try {
        const carros = carroService.listarTodos(); // Variável para armazenar os carros que rertonaram da função
        // Caso de certo, retorna o status 200 e a mensagem
        res.status(200).json({
            mensagem: "Carros listados com sucesso!",
            carros: carros
        });
      // Caso não, pega o status do erro jogado pelo Service (400, 409) ou assume 500  
    } catch (error: any) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message || "Erro interno do servidor." });
    }
}

//GET - listar carrosdisponiveis 
export function listarCarrosDisponiveis(req: Request, res: Response){
    try{
        const carros = carroService.listarCarrosDisponiveis();// Variável para armazenar os carros que rertonaram da função
        // Caso de certo, retorna o status 200 e a mensagem
        res.status(200).json({
            mensagem: "Carros disponiveis listados com sucesso!",
            carros
        })
        // Caso não, pega o status do erro jogado pelo Service (400, 409) ou assume 500  
    }catch (error: any){
        const status = error.status || 500;
        res.status(status).json({message: error.message})
    }
}

// GET - Buscar carro por ID
export function buscarCarroPorId(req: Request, res: Response) {
    try {
        const id = Number(req.params.id); // Extrai o id dos parâmetros da URL

        const carro = carroService.buscarPorId(id); // Variável para armazenar o carro que retorna da função
        // Caso de certo, retorna o status 200 e a mensagem
        res.status(200).json({
            mensagem: "Carro encontrado com sucesso!",
            carro: carro
        });
      // Caso não encontre, trata o erro 404  
    } catch (error: any) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
}

// PUT - Atualizar dados do carro
export function atualizarCarro(req: Request, res: Response) {
    try {
        const id = Number(req.params.id); // Extrai o id dos parâmetros da URL

        const carroAtualizado = carroService.atualizarCarro(id, req.body); // Variável para armazenar o carro atualizado que retorna da função
        // Caso de certo, retorna o status 200 e a mensagem
        res.status(200).json({
            mensagem: "Carro atualizado com sucesso!",
            carro: carroAtualizado
        });
      // Caso não de certo, trata o erro 404 
    } catch (error: any) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
}

// DELETE - Deletar um carro
export function deletarCarro(req: Request, res: Response) {
    try {
        const id = Number(req.params.id); // Extrai o id dos parâmetros da URL

        carroService.deletarCarro(id); // Chama a funnção de deletar, passando o "id" obtido por parametro

        // Caso de certo, retorna o status 200 e a mensagem
        res.status(200).json({
            mensagem: "Carro removido com sucesso!"
        });
      // Caso não de certo, trata o 404 ou 422 (regra do estoque)
    } catch (error: any) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
}