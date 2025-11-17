import axios from 'axios';
const geoRefAxiosInstance = axios.create({
  baseURL: 'https://apis.datos.gob.ar/georef/api/v2.0',
  timeout: 2000,
});

export const geoRefAxiosInstanceEndpoints = {
  PROVINCES: '/provincias.json',
};

export default geoRefAxiosInstance;
