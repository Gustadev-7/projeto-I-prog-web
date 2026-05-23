import { Cliente } from "./Cliente";
import { Vendedor } from "./Vendedor";
import { Carro } from "./Carro";

export class NotaFiscal{
    id_nota: number;
    numero_nota: string;
    data_emissao: Date;
    valor_total: number;
    id_cliente : Cliente;
    id_vendedor : Vendedor;
    id_carro: Carro;

    constructor(numero_nota: string, data_emissao: Date, valor_total: number, id_cliente: Cliente, id_vendedor: Vendedor, id_carro: Carro){
        this.id_nota = this.geraId();
        this.numero_nota = numero_nota;
        this.data_emissao = data_emissao;
        this.valor_total = valor_total;
        this.id_cliente = id_cliente;
        this.id_vendedor = id_vendedor;
        this.id_carro = id_carro;
        
    }

        private geraId():number {
        return Date.now();
    }
}