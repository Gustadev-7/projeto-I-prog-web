export class Cliente{
    // declara + recebe + atribui de uma vez
    constructor(
        public id_cliente: Number | null,
        public nome: string,
        public CPF: string,
        public telefone: string,
        public email: string | null,
        public idade: string | null,
    ){}
}