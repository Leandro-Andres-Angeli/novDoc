export interface GeoRefCitiesResponse<T = Ciudad> {
  cantidad: number;
  inicio: number;
  municipios: T[];
  parametros: Parametros;
  total: number;
}

export interface Ciudad {
  centroide: Centroide;
  id: string;
  nombre: string;
  provincia: Provincia;
}

export interface Centroide {
  lat: number;
  lon: number;
}

export interface Provincia {
  id: string;
  nombre: string;
}

export interface Parametros {
  provincia: string[];
}
