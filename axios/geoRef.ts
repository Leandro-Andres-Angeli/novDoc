import axios, { AxiosError } from 'axios';
import axiosRetry from 'axios-retry';
const geoRefAxiosInstance = axios.create({
  baseURL: 'https://apis.datos.gob.ar/georef/api',
  timeout: 2500,
});

axiosRetry(geoRefAxiosInstance, {
  retries: 2,
  retryDelay: axiosRetry.exponentialDelay,
});
export const geoRefAxiosInstanceEndpoints = {
  PROVINCES: '/provincias.json',
  MUNICIPIOS: (provinceId: string) =>
    `/municipios?provincia=${provinceId}&max=500`,
  COORDS: (lat: string, lon: string) => `/ubicacion?lat=${lat}&lon=${lon}`,
};

export default geoRefAxiosInstance;
