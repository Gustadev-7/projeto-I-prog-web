export class Vendedor{
    // declara + recebe + atribui de uma vez - gera id pelo banco
    constructor(
        public id_vendedor: number | null,
        public nome: string,
        public matricula: string,
        public comissao_percentual: number
    ){}
}