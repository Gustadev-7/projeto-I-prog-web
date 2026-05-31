import express from "express";

//importando os controllers 
import { cadastrarCarro, listarCarros, buscarCarroPorId, atualizarCarro, deletarCarro } from "./controllers/carroController";
import { cadastrarCliente, buscarCliente, listarClientes, atualizarCliente, deletarCliente } from "./controllers/clienteController";
import { cadastrarEstoque, buscarEstoque, deletarEstoque } from "./controllers/estoqueController";
import { emitirNota, listarNotasPorCliente, listarNotasPorVendedor, deletarNota } from "./controllers/notaFiscalController";
import { cadastrarVendedor, listarVendedores, buscarVendedor, atualizarVendedor, deletarVendedor } from "./controllers/vendedorController";

//criando estancia do express que é o servidor 
const app = express();
const PORT = process.env.PORT ?? 3000;

//permite que o servidor leia o corpo da requisição
app.use(express.json());

function logInfo () {
console . log (`API em execucao no URL: http://localhost: ${PORT}`) ;
}//exibe a mensagem no terminal quando o servidor subir 

//Rotas para Carro
app.post("/api/carro", cadastrarCarro);
app.get("/api/carros", listarCarros);
app.get("/api/carro/:id", buscarCarroPorId);
app.put("/api/carro/:id", atualizarCarro);
app.delete("/api/carro/:id", deletarCarro);

//Rotas para Cliente 
app.post("/api/cliente", cadastrarCliente);
app.get("/api/cliente", buscarCliente);
app.get("/api/clientes", listarClientes);
app.put("/api/cliente/:id_cliente", atualizarCliente);
app.delete("/api/cliente/:id_cliente", deletarCliente);

//rotas para Estoque
app.post("/api/estoque", cadastrarEstoque);
app.get("/api/estoque/:id_estoque", buscarEstoque);
app.delete("/api/estoque/:id_estoque", deletarEstoque);

//rotas para Nota Fiscal 
app.post("/api/nota", emitirNota);
app.get("/api/notas/cliente", listarNotasPorCliente);
app.get("/api/notas/vendedor", listarNotasPorVendedor);
app.delete("/api/estoque/:id_nota", deletarNota);

//rotas para Vendedor
app.post("/api/vendedor", cadastrarVendedor);
app.get("/api/vendedores", listarVendedores);
app.get("/api/vendedor/:id_vendedor", buscarVendedor);
app.put("/api/vendedor/:id_vendedor", atualizarVendedor);
app.delete("/api/vendedor/:id_vendedor", deletarVendedor);

app.listen(PORT, logInfo);