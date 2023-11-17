import cuentaService from '../../services/cuenta.service';
import transaccionService from '../../services/transaccion.service';

function processInput(data: any): any {
  if (data.cuenta) {
    const violaciones = cuentaService.crearCuenta(data.cuenta);
    return { cuenta: data.cuenta, violaciones };
  } else if (data.transaccion) {
    const { cuenta, violaciones } = transaccionService.autorizarTransaccion(
      data.transaccion
    );
    return { cuenta, violaciones };
  }
}

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', () => {
  let chunk;
  while ((chunk = process.stdin.read()) !== null) {
    const line = chunk.trim();
    if (line) {
      try {
        const data = JSON.parse(line);
        const response = processInput(data);
        console.log(JSON.stringify(response));
        console.log('---');
      } catch (error) {
        console.error('Error al procesar la entrada:', error);
      }
    }
  }
});
