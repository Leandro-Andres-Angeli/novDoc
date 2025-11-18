import axios from 'axios';
const geoRefAxiosInstance = axios.create({
  baseURL: 'https://apis.datos.gob.ar/georef/api',
  timeout: 2000,
});

export const geoRefAxiosInstanceEndpoints = {
  PROVINCES: '/provincias.json',
  MUNICIPIOS: (provinceId: string) => `/municipios?provincia=${provinceId}`,
};

export default geoRefAxiosInstance;
