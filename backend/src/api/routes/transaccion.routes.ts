import { Router } from 'express';
import transaccionController from '../controllers/transaccion.controller';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/transaccion',
  [
    body('id').isInt(),
    body('comerciante').isString(),
    body('cantidad').isInt(),
    body('tiempo').isDate(),
  ],
  transaccionController.autorizarTransaccion
);

export default router;
