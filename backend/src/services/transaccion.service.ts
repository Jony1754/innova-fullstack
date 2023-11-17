import Transaccion from '../models/Transaccion';
import CuentaService from './cuenta.service';
import Cuenta from '../models/Cuenta';
import { LIMITE_TRANSACCIONES, INTERVALO_TIEMPO } from '../utils/constants';

class TransaccionService {
  private transacciones: Transaccion[] = [];

  autorizarTransaccion(transaccion: Transaccion): {
    cuenta: Cuenta | undefined;
    violaciones: string[];
  } {
    // console.log(this.transacciones);
    const violaciones: string[] = [];
    const cuenta = CuentaService.obtenerCuenta(transaccion.id);

    if (!cuenta) {
      violaciones.push('cuenta-no-inicializada');
      return { cuenta, violaciones };
    }

    if (!cuenta.tarjeta_activa) {
      violaciones.push('tarjeta-no-activa');
    }

    if (transaccion.cantidad > cuenta.limite_disponible) {
      violaciones.push('limite-insuficiente');
    }

    const ahora = new Date().getTime(); 
    const transaccionesRecientes = this.transacciones.filter(
      (t) => ahora - new Date(t.tiempo).getTime() <= INTERVALO_TIEMPO 
    );

    if (transaccionesRecientes.length >= LIMITE_TRANSACCIONES) {
      violaciones.push('alta-frecuencia-pequeno-intervalo');
    }
    const esDuplicada = this.transacciones.some(
      (t) =>
        t.comerciante === transaccion.comerciante &&
        t.cantidad === transaccion.cantidad &&
        new Date(transaccion.tiempo).getTime() - new Date(t.tiempo).getTime() <
          INTERVALO_TIEMPO
    );

    if (esDuplicada) {
      violaciones.push('transaccion-duplicada');
    }


    if (violaciones.length === 0) {
      cuenta.limite_disponible -= transaccion.cantidad;
      this.transacciones.push(transaccion);
    }

    return { cuenta, violaciones };
  }
}

export default new TransaccionService();
