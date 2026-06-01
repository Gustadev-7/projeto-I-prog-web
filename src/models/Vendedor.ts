export class Vendedor{
    private static nextId = 1; // Variável estática para gerar IDs únicos para cada vendedor
    id_vendedor: Number;
    nome: string;
    matricula: string;
    comissao_percentual: Number;

    constructor(nome: string, matricula: string, comissao_percentual: Number){
        this.id_vendedor = Vendedor.nextId++;
        this.nome = nome;
        this.matricula = matricula;
        this.comissao_percentual = comissao_percentual;
    }
}