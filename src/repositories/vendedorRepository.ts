import { Vendedor } from "../models/Vendedor"

export class vendedorRepository{
    private static instance: vendedorRepository;
    private vendedorList: Vendedor[] = [];

    private constructor () {}

    public static getInstance(): vendedorRepository{
        if(!this.instance){
            this.instance = new vendedorRepository();
        }
        return this.instance;
    }

    insereVendedor(vendedor: Vendedor){
        this.vendedorList.push(vendedor)
    }
}