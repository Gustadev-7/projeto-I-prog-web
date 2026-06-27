import {NotaFiscal} from '../model/NotaFiscal';
import {NotaFiscalRepository} from '../repositories/notaFiscalRepository';
import {ClienteRepository} from '../repositories/clienteRepository';
import {VendedorRepository} from '../repositories/vendedorRepository';
import {CarroRepository} from '../repositories/carroRepository';
import {EstoqueRepository} from '../repositories/estoqueRepository';

export class NotaFiscalService {
    //Criando as instancias dos repositórios para usar os dados que ja temos nos arrays
    notaFiscalRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance();
    clienteRepository: ClienteRepository = ClienteRepository.getInstance();
    vendedorRepository: VendedorRepository = VendedorRepository.getInstance();
    CarroRepository: CarroRepository = CarroRepository.getInstance();
    EstoqueRepository: EstoqueRepository = EstoqueRepository.getInstance();

    //Criar a nota fiscal 
    emitirNota(dados: any): NotaFiscal {

        //Valida o numero da nota, que é obrigatório e unico 
        if(!dados.numero_nota){
            throw new Error("Número da nota é obrigatório");
        }

        //Verificando se o numero da nota já existe 
        if(this.notaFiscalRepository.filtrarNotaPorNumero(dados.numero_nota)){
            throw new Error("Número da nota já existe");
        }

        //valor_total positivo e maior que zero 
        if(!dados.valor_total || dados.valor_total <= 0){
            throw new Error("Valor total deve ser maior que zero");
        }

        //Validando campos obrigatorios (id_cliente, id_vendedor, id_carro)
        if(!dados.id_cliente || !dados.id_vendedor || !dados.id_carro){
            throw new Error("Cliente, vendedor e carro são obrigátorios");
        }

        //*Devem referenciar registros existente - verificação cliente, vendedor e carro 

        //Verificando se o cliente existe
        const cliente = this.clienteRepository.listarClientePorId(dados.id_cliente); //usando o const para conseguir verificar se veio undefined ou não 
        if(!cliente){
            throw new Error("Cliente não encontrado");
        }

        //Verificando se o vendedor existe
        const vendedor = this.vendedorRepository.filtraVendedorPorId(dados.id_vendedor);
        if(!vendedor){
            throw new Error("Vendedor não encontrado");
        }

        //Verificando se o carro existe
        const carro = this.CarroRepository.listarPorId(dados.id_carro);
        if(!carro){
            throw new Error("Carro não encontrado");
        }

        //Verificando o estoque do carro 
        const estoque = this.EstoqueRepository.filtraEstoquePorCarro(dados.id_carro);
        if(!estoque || estoque.quantidade <=0){
            throw new Error("Carro sem estoque disponível");
        }

        //data da emissão não pode ser data futura 
        const data_emissao = new Date(dados.data_emissao); //converte a requisão que veio para Date
        if(data_emissao > new Date()){
            throw new Error ("Data de emissão não pode ser uma data futura");
        }

        //ao emetir a quantidade do estoque é automaticamente decrementada
        estoque.quantidade -= 1; 

        //Criando a nota fiscal 
        const nota = new NotaFiscal (
            dados.numero_nota,
            data_emissao,
            dados.valor_total,
            cliente,
            vendedor,
            carro
        );

        this.notaFiscalRepository.insereNotaFiscal(nota);
        return nota;
    }

    //Nota fiscal não pode ser removida após a emissao 
    deletarNota(id_nota: number): void { 
       throw new Error("Nota fiscal não pode ser deletada após a emissão!!");
    }

    //*NotaFiscal[] para retornar vários registros se houver 
        
    //listar notas por cliente especifico 
    listarNotasPorCliente(id_cliente: number): NotaFiscal[]{
        return this.notaFiscalRepository.filtrarNotasCliente(id_cliente);
    }

    //listar notas por vendedor especifico
    listarNotasPorVendedor(id_vendedor: number): NotaFiscal[]{
        return this.notaFiscalRepository.filtrarNotasVendedor(id_vendedor);
    }

    //listar notas por carro especifico
    listarNotasPorCarro(id_carro: number): NotaFiscal[]{
        return this.notaFiscalRepository.filtrarNotasCarro(id_carro);
    }

    //listar todas as notas fiscais
    listarNotas(): NotaFiscal[]{
        return this.notaFiscalRepository.listarNotasFiscais();
    }

    //buscar nota por id
    buscarNotaPorId(id_nota: number): NotaFiscal {
        const nota = this.notaFiscalRepository.filtraNotaPorId(id_nota);

        if(!nota){
            throw new Error("Nota fiscal não encontrada");
        }
        return nota;
    }
}