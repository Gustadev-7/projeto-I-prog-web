export class Estoque {
    private static nextId = 1; // Variável estática para gerar IDs únicos para cada item de estoque
    id_estoque: number
    id_carro: number
    quantidade: number
    localizacao_patio: string
    data_entrada: Date

    constructor(id_carro: number, quantidade:number, localização_patio: string, data_entrada: Date) {
        this.id_estoque = Estoque.nextId++;
        this.id_carro = id_carro;
        this.quantidade = quantidade;
        this.localizacao_patio = localização_patio;
        this.data_entrada = data_entrada;
    }
}