import express, { Application } from 'express';
import authRouter from '../routes/auth';
import userRouter from '../routes/user';
import recordRouter from '../routes/record';
import cors from 'cors';
import db from '../db/connection';
import'./record';
import'./user';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        authPath:       '/api/auth',
        usersPath:      '/api/user',
        recordsPath:    '/api/record',
    };

    constructor(){
        this.app    = express();
        this.port   = process.env.PORT || '8000';

        this.dbConnect();
        this.middlewares();
        this.routes();
    }

    async dbConnect() {
        try {
            await db.sync();   
            console.log('Database Online'); 
        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares(){
        // Cors
        this.app.use(cors());
        // Lectura del body
        this.app.use( express.json());
        // Carpeta publica
        this.app.use( express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.authPath,   authRouter);
        this.app.use(this.apiPaths.usersPath,   userRouter);
        this.app.use(this.apiPaths.recordsPath, recordRouter);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}

export default Server;