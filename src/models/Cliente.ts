export class Cliente{
    private static nextId = 1; // Variável estática para gerar IDs únicos para cada cliente
    id_cliente: Number;
    nome: string;
    CPF: string;
    telefone: string;
    email: string;
    cidade: string;

    constructor(nome: string, CPF: string, telefone: string, email:string, cidade: string){
        this.id_cliente = Cliente.nextId++;
        this.nome = nome;
        this.CPF = CPF;
        this.telefone = telefone;
        this.email = email;
        this.cidade = cidade;
    }
}