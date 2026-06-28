import "dotenv/config";
import express from "express";
import router from "./routes/router";
import {inicializarBanco} from "./database/mysql";


//criando estancia do express que é o servidor 
const app = express();
const PORT = process.env.PORT ?? 3000;

//permite que o servidor leia o corpo da requisição
app.use(express.json());

//egistra todas as rotas centralizadas no router.ts
app.use(router);

async function startServer() {
    //aguarda o banco criar as tabelas antes do servidor subir
    await inicializarBanco();

    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
    
}

startServer();
