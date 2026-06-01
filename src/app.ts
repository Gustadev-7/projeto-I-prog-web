import express from "express";

//importando os controllers 
import { cadastrarCarro, listarCarros,listarCarrosDisponiveis, buscarCarroPorId, atualizarCarro, deletarCarro } from "./controllers/carroController";
import { cadastrarCliente, buscarCliente, listarClientes, atualizarCliente, deletarCliente } from "./controllers/clienteController";
import { cadastrarEstoque,listarEstoque, buscarEstoque, buscarEstoquePorCarro, atualizarEstoque, deletarEstoque } from "./controllers/estoqueController";
import { emitirNota, listarNotasPorCliente, listarNotasPorVendedor,listarNotas, buscarNotaPorId, deletarNota } from "./controllers/notaFiscalController";
import { cadastrarVendedor, listarVendedores, buscarVendedor, atualizarVendedor, deletarVendedor } from "./controllers/vendedorController";

//criando estancia do express que é o servidor 
const app = express();
const PORT = process.env.PORT ?? 3000;

//permite que o servidor leia o corpo da requisição
app.use(express.json());

function logInfo () {
console . log (`API em execucao no URL: http://localhost: ${PORT}`) ;
}//exibe a mensagem no terminal quando o servidor subir 


//Rotas para Cliente 
app.get("/clientes", listarClientes);
app.get("/clientes/notas/:id", listarNotasPorCliente);
app.get("/clientes/:id", buscarCliente);
app.post("/clientes", cadastrarCliente);
app.put("/clientes/:id_cliente", atualizarCliente);
app.delete("/clientes/:id_cliente", deletarCliente);

//rotas para Vendedor
app.get("/vendedores", listarVendedores);
app.get("/vendedores/notas/:id", listarNotasPorVendedor);
app.get("/vendedores/:id_vendedor", buscarVendedor);
app.post("/vendedores", cadastrarVendedor);
app.put("/vendedores/:id_vendedor", atualizarVendedor);
app.delete("/vendedores/:id_vendedor", deletarVendedor);

//Rotas para Carro
app.get("/carros", listarCarros);
app.get("/carros/disponiveis", listarCarrosDisponiveis);
app.get("/carros/:id", buscarCarroPorId);
app.post("/carros", cadastrarCarro);
app.put("/carros/:id", atualizarCarro);
app.delete("/carros/:id", deletarCarro);

//rotas para Estoque
app.get("/estoque",listarEstoque);
app.get("/estoque/carro/:id_carro", buscarEstoquePorCarro);
app.get("/estoque/:id_estoque", buscarEstoque);
app.post("/estoque", cadastrarEstoque);
app.put("/estoque/:id_estoque", atualizarEstoque);
app.delete("/estoque/:id_estoque", deletarEstoque);

//rotas para Nota Fiscal 
app.get("/notas", listarNotas);
app.get("/notas/:id_nota", buscarNotaPorId);
app.post("/notas", emitirNota);
app.delete("/notas/:id_nota", deletarNota);


app.listen(PORT, logInfo);