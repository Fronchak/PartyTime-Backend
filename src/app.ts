import express from 'express';
import errorHandler from "./error-handling/error-handler";
import cors from 'cors';
import authRoutes from './routes/auth-routes';
import userRoutes from './routes/user-routes';
import partyRoutes from './routes/party-routes';

class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.errorHandler();
    }

    private middlewares() {
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use(express.static('public'));
    }

    private routes() {
        this.server.use('/auth', authRoutes);
        this.server.use('/users', userRoutes);
        this.server.use('/parties', partyRoutes);
    }

    private errorHandler() {
        this.server.use(errorHandler);
    }
}

export default App;