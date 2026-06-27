//vendedorService
import { VendedorRepository } from "../repositories/vendedorRepository";
import { Vendedor } from "../model/Vendedor";
import { NotaFiscalRepository } from "../repositories/notaFiscalRepository";

export class VendedorService{
    vendedorRepository: VendedorRepository = VendedorRepository.getInstance();
    notaFiscalRepository: NotaFiscalRepository = NotaFiscalRepository.getInstance();

    cadastrarVendedor(dados: any): Vendedor {
        //Validação dos dados obrigatórios
       if(!dados.nome || !dados.matricula || dados.comissao_percentual == null){
            throw {
                status: 400,
                message: "Dados obrigatórios incompletos"
            };
        }

        //Vendedores com a mesma matrícula não podem ser cadastrados
        if(this.vendedorRepository.buscarPorMatricula(dados.matricula)){
            throw {
                status: 409,
                message: "Matrícula já cadastrada"
            };
        }

        //comissão percentual deve ser um número entre 0 e 30
        if(Number(dados.comissao_percentual) < 0 || Number(dados.comissao_percentual) > 30){
            throw {
                status: 400,
                message: "Comissão percentual deve estar entre 0 e 30%"
            };
        }

        //criando o vendedor com os dados da requisição
        const vendedor = new Vendedor(
            dados.nome,
            dados.matricula,
            dados.comissao_percentual
        );

        //inserimos o vendedor no reppsitótio, guarda no array de vendedores
        this.vendedorRepository.insereVendedor(vendedor); 
        return vendedor;
    }

        //buscar vendedor
        buscarVendedor(id_vendedor: number): Vendedor {
            const vendedor =
                this.vendedorRepository.filtraVendedorPorId(id_vendedor);

            if(!vendedor){
                throw {
                    status: 404,
                    message: "Vendedor não encontrado"
                };
            }

            return vendedor;
        }

        //listar vendedores
        listarVendedores(): Vendedor[] {
            return this.vendedorRepository.listarVendedores();
        }

        //atualizar vendedor
        atualizarVendedor(id_vendedor: number, dados: any): Vendedor {
            if(dados.matricula){
                const vendedorExistente = this.vendedorRepository.buscarPorMatricula(dados.matricula);

                //verifica se a matrícula já existe para outro vendedor
                if(vendedorExistente && vendedorExistente.id_vendedor !== id_vendedor){
                    throw {
                        status: 409,
                        message: "Matrícula já cadastrada para outro vendedor"
                    };
                }
            }

            //validar comissão percentual se for fornecida
            if(dados.comissao_percentual != undefined && (Number(dados.comissao_percentual) < 0 || Number(dados.comissao_percentual) > 30)){
                throw {
                    status: 400,
                    message: "Comissão percentual deve estar entre 0 e 30%"
                };
            }

            const vendedorAtualizado = this.vendedorRepository.atualizarVendedor(id_vendedor, dados);

            if(!vendedorAtualizado){
                throw {
                    status: 404,
                    message: "Vendedor não encontrado para atualização"
                };
            }

            return vendedorAtualizado;
        }

        //deletar vendedor caso ele não esteja associado a nenhuma nota fiscal
        deletarVendedor(id_vendedor: number): void {
            const notasAssociadas = this.notaFiscalRepository.filtrarNotasVendedor(id_vendedor);

            if(notasAssociadas.length > 0){
                throw {
                    status: 400,
                    message: "Não é possível deletar o vendedor, ele está associado a uma ou mais notas fiscais"
                };
            }

            const vendedorDeletado = this.vendedorRepository.deletarVendedor(id_vendedor);

            if(!vendedorDeletado){
                throw {
                    status: 404,
                    message: "Vendedor não encontrado para deleção"
                };
            }
        }
}
