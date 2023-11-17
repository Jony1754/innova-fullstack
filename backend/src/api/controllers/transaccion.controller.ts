import { Request, Response } from 'express';
import transaccionService from '../../services/transaccion.service';
class TransaccionController {
  autorizarTransaccion(req: Request, res: Response): void {
    const { cuenta, violaciones } = transaccionService.autorizarTransaccion(
      req.body
    );
    res.json({ cuenta, violaciones });
  }
}

export default new TransaccionController();
