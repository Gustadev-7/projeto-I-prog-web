import{Router, Request, Response} from "express";
import { ClienteController } from "../controllers/clienteController";
import { EstoqueController } from "../controllers/estoqueController";
import { NotaFiscalController } from "../controllers/notaFiscalController";
import { VendedorController } from "../controllers/vendedorController"; 
import { CarroController } from "../controllers/carroController";

const router = Router();

//Instancia dos controllers para usar os métodos
const clienteController = new ClienteController();
const estoqueController = new EstoqueController();
const notaFiscalController = new NotaFiscalController();
const vendedorController = new VendedorController();
const carroController = new CarroController();

//ROTAS DE CLIENTE
router.get("/clientes", (req: Request, res: Response) => {clienteController.listarClientes(req, res)});
router.get("/clientes/notas/:id", (req: Request, res: Response) => {clienteController.listarNotasPorCliente(req, res)});
router.get("/clientes/:id", (req: Request, res: Response) => {clienteController.buscarClientePorId(req, res)});
router.post("/clientes/", (req: Request, res: Response) => {clienteController.criarCliente(req, res)});
router.put("/clientes/:id", (req: Request, res: Response) => {clienteController.atualizarCliente(req, res)});
router.delete("/clientes/:id", (req: Request, res: Response) => {clienteController.deletarCliente(req, res)});


//ROTAS DE VENDEDORES
router.get("/vendedores", (req: Request, res: Response) => {vendedorController.listarVendedores(req, res)});
router.get("/vendedores/notas/:id", (req: Request, res: Response) => {vendedorController.listarNotasPorVendedor(req, res)});
router.get("/vendedores/:id", (req: Request, res: Response) => {vendedorController.buscarVendedor(req, res)});
router.post("/vendedores/", (req: Request, res: Response) => {vendedorController.cadastrarVendedor(req, res)});
router.put("/vendedores/:id", (req: Request, res: Response) => {vendedorController.atualizarVendedor(req, res)});
router.delete("/vendedores/:id", (req: Request, res: Response) => {vendedorController.deletarVendedor(req, res)});


//ROTAS DE CARRO 
router.get("/carros", (req: Request, res: Response) => {carroController.listarCarros(req, res)});
router.get("/carros/disponiveis", (req: Request, res: Response) => {carroController.listarCarrosDisponiveis(req, res)});
router.get("/carros/:id", (req: Request, res: Response) => {carroController.buscarCarroPorId(req, res)});
router.post("/carros/", (req: Request, res: Response) => {carroController.cadastrarCarro(req, res)});
router.put("/carros/:id", (req: Request, res: Response) => {carroController.atualizarCarro(req, res)});
router.delete("/carros/:id", (req: Request, res: Response) => {carroController.deletarCarro(req, res)});

//ROTAS DE ESTOQUE
router.get("/estoque", (req: Request, res: Response) => {estoqueController.listarEstoque(req, res)});
router.get("/estoque/carro/:id", (req: Request, res: Response) => {estoqueController.buscarEstoquePorCarro(req, res)});
router.get("/estoque/:id", (req: Request, res: Response) => {estoqueController.buscarEstoque(req, res)});
router.post("/estoque/", (req: Request, res: Response) => {estoqueController.cadastrarEstoque(req, res)});
router.put("/estoque/:id", (req: Request, res: Response) => {estoqueController.atualizarEstoque(req, res)});
router.delete("/estoque/:id", (req: Request, res: Response) => {estoqueController.deletarEstoque(req, res)});

//ROTAS DE NOTA FISCAL
router.get("/notas", (req: Request, res: Response) => {notaFiscalController.listarNotas(req, res)});
router.get("/notas/:id", (req: Request, res: Response) => {notaFiscalController.buscarNotaPorId(req, res)});
router.post("/notas", (req: Request, res: Response) => {notaFiscalController.emitirNota(req, res)});
router.delete("/notas/:id", (req: Request, res: Response) => {notaFiscalController.deletarNota(req, res)});

export default router;
