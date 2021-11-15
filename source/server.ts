import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import { Database } from './database'

dotenv.config();

const server = express();

server.use(cors())//Cross-origin Resource Sharing

server.get("/", (req: Request, res: Response) => {
  const db = new Database
  db.deleteData()
  res.send("Ok");
});

server.listen(process.env.PORTA, () => {
  console.log("Server rodando na porta " + process.env.PORTA);
});
