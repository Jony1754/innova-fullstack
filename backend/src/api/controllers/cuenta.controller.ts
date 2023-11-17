import { Request, Response } from 'express';
import CuentaService from '../../services/cuenta.service';
import { validationResult } from 'express-validator';
class CuentaController {
  crearCuenta(req: Request, res: Response): void {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const violaciones = CuentaService.crearCuenta(req.body);
    const cuenta = CuentaService.obtenerCuenta(req.body.id);

    res.json({ cuenta, violaciones });
  }
}

export default new CuentaController();
