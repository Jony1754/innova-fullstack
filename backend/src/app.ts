import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cuentaRoutes from './api/routes/cuenta.routes';
import transaccionRoutes from './api/routes/transaccion.routes';
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api', cuentaRoutes);
app.use('/api', transaccionRoutes);
app.use(
  (
    err: ErrorRequestHandler,
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err);
    res.status(500).send('Ocurrió un error');
  }
);

export default app;
