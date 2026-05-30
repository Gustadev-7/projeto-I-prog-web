import { Vendedor } from "../models/Vendedor"

export class VendedorRepository{
    private static instance: VendedorRepository;
    private vendedorList: Vendedor[] = [];

    private constructor () {}

    //singleton para garantir que haja apenas uma instancia do repositório
    public static getInstance(): VendedorRepository{
        if(!this.instance){
            this.instance = new VendedorRepository();
        }
        return this.instance;
    }

    //cadastrar vendedor
    insereVendedor(vendedor: Vendedor){
        this.vendedorList.push(vendedor)
    }

    //listar vendedores
    listarVendedores(): Vendedor[]{
        return this.vendedorList;
    }

    //filtrar vendedor por id
    filtraVendedorPorId(id_vendedor: Number): Vendedor | undefined{
        return this.vendedorList.find(vendedor => vendedor.id_vendedor === id_vendedor);
    }

    buscarPorMatricula(matricula: string): Vendedor | undefined {
    return this.vendedorList.find(
        vendedor => vendedor.matricula === matricula
    );
    }
    
    //atualizar vendedor por id
    atualizarVendedor(id_vendedor: Number, dados: Partial<Vendedor>): Vendedor | undefined {

        //encontra o vendedor a ser atualizado usando o id fornecido
        const vendedor = this.vendedorList.find(vendedor => vendedor.id_vendedor === id_vendedor);

        if (!vendedor) return undefined;

        //atualiza os dados do vendedor encontrado com os novos dados fornecidos
        Object.assign(vendedor, dados);
        return vendedor;
    }

    //deletar vendedor por id
    deletarVendedor(id_vendedor: Number): Vendedor | undefined {

        //encontra o índice do vendedor a ser deletado
        const vendedor = this.vendedorList.findIndex(vendedor => vendedor.id_vendedor === id_vendedor);
        if(vendedor === -1) return undefined;

        //armazena o vendedor a ser deletado para retornar depois da remoção
        const vendedorDeletado = this.vendedorList[vendedor];

        //remove o vendedor da lista usando o índice encontrado
        this.vendedorList.splice(vendedor, 1);
        return vendedorDeletado;
    }
}