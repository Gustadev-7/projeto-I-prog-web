import { Vendedor } from "../models/Vendedor"

export class vendedorRepository{
    private static instance: vendedorRepository;
    private vendedorList: Vendedor[] = [];

    private constructor () {}

    //singleton para garantir que haja apenas uma instancia do repositório
    public static getInstance(): vendedorRepository{
        if(!this.instance){
            this.instance = new vendedorRepository();
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
    
    //atualizar vendedor por id
    atualizarVendedor(id_vendedor: Number, dados: Partial<Vendedor>): Vendedor | undefined {
        const vendedor = this.vendedorList.find(vendedor => vendedor.id_vendedor === id_vendedor);

        if (!vendedor) return undefined;

        Object.assign(vendedor, dados);
        return vendedor;
    }

    //deletar vendedor por id
    deletarVendedor(id_vendedor: Number): Vendedor | undefined {
        const vendedor = this.vendedorList.findIndex(vendedor => vendedor.id_vendedor === id_vendedor);
        if(vendedor === -1) return undefined;

        const vendedorDeletado = this.vendedorList[vendedor];

        this.vendedorList.splice(vendedor, 1);
        return vendedorDeletado;
    }
}