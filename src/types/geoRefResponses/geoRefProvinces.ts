export interface GeoRefProvincesResponse {
  cantidad: number;
  total: number;
  inicio: number;
  parametros: Parametros;
  provincias: Provincia[];
}

export interface Parametros {}

export interface Provincia {
  id: string;
  nombre: string;
  nombre_completo: string;
  fuente: Fuente;
  categoria: Categoria;
  centroide: Centroide;
  iso_id: string;
  iso_nombre: string;
}

export enum Categoria {
  CiudadAutónoma = 'Ciudad Autónoma',
  Provincia = 'Provincia',
}

export interface Centroide {
  lon: number;
  lat: number;
}

export enum Fuente {
  Ign = 'IGN',
}
