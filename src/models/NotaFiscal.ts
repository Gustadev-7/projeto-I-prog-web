export class NotaFiscal{
    // declara + recebe + atribui de uma vez - gera id pelo banco
    constructor(
       public id_nota: number | null,
       public numero_nota: string,
       public data_emissao: Date,
       public valor_total: number,
       public id_cliente : number,
       public id_vendedor : number,
       public id_carro: number
    ){}
}
    