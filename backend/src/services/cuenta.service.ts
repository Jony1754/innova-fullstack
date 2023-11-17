import Cuenta from '../models/Cuenta';

class CuentaService {
  private cuentas: Map<number, Cuenta> = new Map();

  crearCuenta(cuenta: Cuenta): string[] {
    const violaciones = [];

    if (this.cuentas.has(cuenta.id)) {
      violaciones.push('cuenta-ya-inicializada');
    } else {
      this.cuentas.set(cuenta.id, cuenta);
    }

    return violaciones;
  }

  obtenerCuenta(id: number): Cuenta | undefined {
    console.log(this.cuentas);
    return this.cuentas.get(id);
  }
}

export default new CuentaService();
