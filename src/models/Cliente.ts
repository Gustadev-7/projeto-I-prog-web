export class Ciente{
    id_cliente: Number;
    nome: string;
    CPF: string;
    telefone: string;
    email: string;
    cidade: string;

    constructor(nome: string, CPF: string, telefone: string, email:string, cidade: string){
        this.id_cliente = this.geraId();
        this.nome = nome;
        this.CPF = CPF;
        this.telefone = telefone;
        this.email = email;
        this.cidade = cidade;
    }

    private geraId():number {
        return Date.now();
    }
}