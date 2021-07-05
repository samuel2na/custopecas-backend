import "reflect-metadata";
import express, { Request, Response, NextFunction } from 'express';

import "./database"; //import da conexão
import { router } from "./routes";

const app = express();
app.use(express.json());

app.use(router);

//criando middleware para tratar os erros
app.use(
    (err: Error, request: Request, response: Response, next: NextFunction)=> {
        if(err instanceof Error){ //verifica se é um erro que tratamos
            return response.status(400).json({
                error: err.message
            });
        }
        return response.status(500).json({
            error: "error",
            message: "Internal Server Error"
        });
});

app.listen(process.env.DB_PORT || 3000, () => {
    console.log(".... server custos running, port " + (process.env.DB_PORT || 3000) + " .......");
});