export interface SearchResponse {
  cuenta: Cuenta;
  violaciones: string[];
}

export interface Cuenta {
  id: number;
  tarjeta_activa: boolean;
  limite_disponible: number;
}
