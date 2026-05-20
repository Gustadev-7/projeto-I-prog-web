export class Vendedor{
    id_vendedor: Number;
    nome: string;
    matricula: string;
    comissao_percentual: Number;

    constructor(nome: string, matricula: string, comissao_percentual: Number){
        this.id_vendedor = this.geraId();
        this.nome = nome;
        this.matricula = matricula;
        this.comissao_percentual = comissao_percentual;
    }
    private geraId():number {
        return Date.now();
    }
}