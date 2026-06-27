export class Carro {
    // declara + recebe + atribui de uma vez - gera id pelo banco
    constructor(
    public id_carro: number | null,
    public marca: string,
    public modelo: string,
    public ano: number,
    public placa: string,
    public preco: number,
    public cor: string
    ) {}
}