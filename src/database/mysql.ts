import mysql, { Connection } from 'mysql2';
import { NotaFiscalRepository } from '../repositories/notaFiscalRepository';
import { EstoqueRepository } from '../repositories/estoqueRepository';
import { CarroRepository } from '../repositories/carroRepository';
import { VendedorRepository } from '../repositories/vendedorRepository';
import { ClienteRepository } from '../repositories/clienteRepository';

// Configurações de conexão com o banco de dados MySQL
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'mike213141',
  database: 'concessionaria'
};

const mysqlConnection: Connection = mysql.createConnection(dbConfig); // Cria a conexão com o banco de dados MySQL

// Conecta ao banco de dados MySQL
mysqlConnection.connect((err) => {
    // Se houver um erro na conexão, exibe uma mensagem de erro no console
    if (err) { 
        console.error('Erro ao conectar ao banco de dados MySQL:', err); 
    }
    // Se a conexão for bem-sucedida, exibe uma mensagem de sucesso
    else { 
        console.log('Conectado ao banco de dados MySQL'); 
    };
});

// Função para executar comandos SQL no banco de dados MySQL
export function executarComandoSQL(query: string, valores: any[]): Promise<any> {
    // Retorna uma Promise que será resolvida ou rejeitada com base no resultado da execução do comando SQL
    return new Promise<any>((resolve, reject) => {
        // Executa o comando SQL usando a conexão MySQL, passando a query e os valores como parâmetros
        mysqlConnection.query(query, valores, (err, resultados) => {
            // Se houver um erro na execução do comando SQL, exibe uma mensagem de erro no console e rejeita a Promise
            if (err) {
                console.error('Erro ao executar o comando SQL:', err);
                reject(err);
              // Se a execução do comando SQL for bem-sucedida, resolve a Promise com os resultados obtidos  
            } else {
                resolve(resultados);
            }
        });
    });
}

// Função para inicializar o banco de dados e sincronizar os repositórios
export async function inicializarBanco(): Promise<void> {
    console.log('Sincronizando o banco de dados'); // Exibe uma mensagem no console indicando que a sincronização do banco de dados está em andamento
    // Cria um array contendo as queries de criação das tabelas para cada repositório
    const schemas = [
        ClienteRepository.getCreateTableQuery(),
        VendedorRepository.getCreateTableQuery(),
        CarroRepository.getCreateTableQuery(),
        EstoqueRepository.getCreateTableQuery(),
        NotaFiscalRepository.getCreateTableQuery(),
    ];

    // Tenta executar as queries de criação das tabelas no banco de dados MySQL
    try {
        await executarComandoSQL(`USE ${dbConfig.database}`, []); // Seleciona o banco de dados especificado nas configurações
        // Para cada query de criação de tabela no array schemas, executa o comando SQL correspondente
        for (const query of schemas) {
            await executarComandoSQL(query, []);
        }
        console.log('Todos os repositórios foram sincronizados com sucesso.');
      // Se ocorrer algum erro durante a execução das queries de criação das tabelas, exibe uma mensagem de erro no console
    } catch (error) {
        console.error('Erro ao sincronizar os repositórios:', error);
    }
}
