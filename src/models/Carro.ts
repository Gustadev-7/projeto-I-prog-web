export class Carro {
    private static nextId = 1; // Variável estática para gerar IDs únicos para cada carro
    id_carro: number
    marca: string
    modelo: string
    ano: number
    placa: string
    preco: number
    cor: string

    constructor(marca: string, modelo: string, ano: number, placa: string, preco: number, cor: string) {
        
        this.id_carro = Carro.nextId++;
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.placa = placa;
        this.preco = preco;
        this.cor = cor;
    }
}