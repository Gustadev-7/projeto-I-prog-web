import {NotaFiscal} from '../model/NotaFiscal';

export class NotaFiscalRepository {
    private static instance: NotaFiscalRepository;
    private notasFiscais: NotaFiscal[] = [];

    private constructor() {}

    public static getInstance(): NotaFiscalRepository {
        if (!this.instance){ 
            this.instance = new NotaFiscalRepository();
        }
        return this.instance;
    }

    //cadastrando nota fiscal
    insereNotaFiscal(nota: NotaFiscal): void {
        this.notasFiscais.push(nota);
    }

    //filtrar por numero da nota
    filtrarNotaPorNumero(numero_nota: string): NotaFiscal | undefined {
        return this.notasFiscais.find(nota => nota.numero_nota === numero_nota);
    }

    //filtrar todas 
    filtrarTodasNotas():NotaFiscal[] {
        return this.notasFiscais;
    }

    //* O filter vai buscar por varios registros, um cliente pode ter mais de uma nota no sistema 
    
    //filtrar nota por cliente, assim chamamos o id do cliente para ver se ele esta associado a alguma 
    filtrarNotasCliente(id_cliente: number): NotaFiscal []{
        return this.notasFiscais.filter(nota => nota.id_cliente.id_cliente === id_cliente);
    }
    
    //filtrar nota por vendedor (mesma coisa acima)
    filtrarNotasVendedor(id_vendedor: number): NotaFiscal [] {
        return this.notasFiscais.filter(nota => Number(nota.id_vendedor.id_vendedor) === id_vendedor);
    }

    //filtrar nota por carro (mesma coisa acima)
    filtrarNotasCarro(id_carro: number): NotaFiscal [] {
        return this.notasFiscais.filter(nota => Number(nota.id_carro.id_carro) === id_carro);
    }
    
    //listar todas as notas fiscais
    listarNotasFiscais(): NotaFiscal[]{
        return this.notasFiscais;
    }

    //filtra nota por id 
    filtraNotaPorId(id_nota: number): NotaFiscal | undefined {
        return this.notasFiscais.find(nota => Number(nota.id_nota) === Number(id_nota));
    }

    //atualizar nota fiscal por id 
    atualizarNotaFiscal(id_nota: number, dados: Partial<NotaFiscal>): NotaFiscal | undefined {
        const nota = this.notasFiscais.find(nota => nota.id_nota === id_nota);

        if (!nota) return undefined;

        Object.assign(nota, dados); // Atualiza apenas as propriedades que foram enviadas na requisição
        return nota 
    }

    //deletar nota fiscal 
    deletarNotaFiscal(id_nota: number): NotaFiscal | undefined {
        const notaIndex = this.notasFiscais.findIndex(nota => id_nota === id_nota);
        if (notaIndex === -1) return undefined;

        const notaDeletada = this.notasFiscais[notaIndex]; //guardando a nota fiscal deletada para retornar depois 

        this.notasFiscais.splice(notaIndex, 1); // Apagando a nota fiscal 
    }
}
