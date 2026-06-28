export class Cliente{
    // declara + recebe + atribui de uma vez - gera id pelo banco
    constructor(
        public id_cliente: number | null,
        public nome: string,
        public cpf: string,
        public telefone: string,
        public email: string | null,
        public cidade: string | null,
    ){}
}