//Repositório Estoque
import { Estoque } from "../models/Estoque"

export class estoqueRepository{
    private static instance: estoqueRepository
    private estoqueList: Estoque[] = [];

    private constructor () {}

    //singleton para garantir que haja apenas uma instancia do repositório
    public static getInstance(): estoqueRepository{
        if(!this.instance){
            this.instance = new estoqueRepository();
        }
        return this.instance;
    }

    //cadastrar estoque
    insereEstoque(estoque: Estoque){
        this.estoqueList.push(estoque)
    }

    //listar estoque
    listarEstoque(): Estoque[]{
        return this.estoqueList;
    }

    //filtrar estoque por id
    filtraEstoquePorId(id_estoque: Number): Estoque | undefined{
        return this.estoqueList.find(estoque => estoque.id_estoque === id_estoque);
    }

    //filtrar estoque por id do carro, retorna o estoque relacionado a um carro específico
    filtraEstoquePorCarro(id_carro: Number): Estoque | undefined{
        return this.estoqueList.find(estoque => estoque.id_carro === id_carro);
    }

    //atualizar estoque por id
    atualizarEstoque(id_estoque: Number, dados: Partial<Estoque>): Estoque | undefined {
        const estoque = this.estoqueList.find(estoque => estoque.id_estoque === id_estoque);

        if (!estoque) return undefined;

        Object.assign(estoque, dados);
        return estoque;
    }

    //deletar estoque por id
    deletarEstoque(id_estoque: Number): Estoque | undefined {
        const estoque = this.estoqueList.findIndex(estoque => estoque.id_estoque === id_estoque);
        if(estoque === -1) return undefined;
        const estoqueDeletado = this.estoqueList[estoque];

        this.estoqueList.splice(estoque, 1);
        return estoqueDeletado;
    }
}