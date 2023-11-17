import { Router } from 'express';
import { body } from 'express-validator';
import cuentaController from '../controllers/cuenta.controller';
const router = Router();

router.post(
  '/cuenta',
  [
    body('id').isInt(),
    body('tarjeta_activa').isBoolean(),
    body('limite_disponible').isInt(),
  ],
  cuentaController.crearCuenta
);

export default router;
