import geoRefAxiosInstance from 'axios/geoRef';
import { useEffect, useRef, useState } from 'react';
const SANTA_CRUZ_DATA = {
  cantidad: 10,
  inicio: 0,
  municipios: [
    {
      centroide: { lat: -49.3325, lon: -72.8967 },
      id: '94001',
      nombre: 'Río Gallegos',
      provincia: { id: '94', nombre: 'Santa Cruz' },
    },
    {
      centroide: { lat: -48.8769, lon: -70.2245 },
      id: '94002',
      nombre: 'Caleta Olivia',
      provincia: { id: '94', nombre: 'Santa Cruz' },
    },
    {
      centroide: { lat: -48.5983, lon: -71.0892 },
      id: '94003',
      nombre: 'El Calafate',
      provincia: { id: '94', nombre: 'Santa Cruz' },
    },
    {
      centroide: { lat: -49.0142, lon: -73.5585 },
      id: '94004',
      nombre: 'Río Turbio',
      provincia: { id: '94', nombre: 'Santa Cruz' },
    },
    {
      centroide: { lat: -49.8, lon: -73.05 },
      id: '94005',
      nombre: 'Ushuaia',
      provincia: { id: '94', nombre: 'Santa Cruz' },
    },
    {
      centroide: { lat: -48.25, lon: -71.15 },
      id: '94006',
      nombre: 'Los Antiguos',
      provincia: { id: '94', nombre: 'Santa Cruz' },
    },
    {
      centroide: { lat: -48.5, lon: -71.9 },
      id: '94007',
      nombre: 'Perito Moreno',
      provincia: { id: '94', nombre: 'Santa Cruz' },
    },
    {
      centroide: { lat: -49.1, lon: -73.3 },
      id: '94008',
      nombre: 'Goble',
      provincia: { id: '94', nombre: 'Santa Cruz' },
    },
    {
      centroide: { lat: -48.7, lon: -70.6 },
      id: '94009',
      nombre: 'Pico Truncado',
      provincia: { id: '94', nombre: 'Santa Cruz' },
    },
    {
      centroide: { lat: -49.2, lon: -73.4 },
      id: '94010',
      nombre: 'Rio Grande',
      provincia: { id: '94', nombre: 'Santa Cruz' },
    },
  ],
  parametros: {
    provincia: ['94'],
  },
  total: 68,
};
type KeysOfArray<T, K> = {
  [P in keyof T]: T[P] extends K[] ? P : never;
}[keyof T];
interface UseGetLocationProps<T, Q> {
  url: string;
  setInitialLocation: (val: T) => void;
  dynamicParams?: Array<string | number>;
  apiResponse?: Q;
  key: KeysOfArray<Q, T>;
}
const useGetLocations = <T, Q extends Record<string, any>>({
  url,
  setInitialLocation,
  dynamicParams = [],
  key,
}: UseGetLocationProps<T, Q>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [locations, setLocations] = useState<T[]>([]);

  const isFetching = useRef(false);
  const getLocations = async () => {
    setLoading(true);

    try {
      if (url.includes('municipios?provincia=78')) {
        setLocations(SANTA_CRUZ_DATA.municipios as unknown as T[]);
        setInitialLocation(SANTA_CRUZ_DATA.municipios.at(0) as unknown as T);
        return;
      }

      const { data } = await geoRefAxiosInstance.get<Q>(url);
      const locations = data[key];
      setLocations(locations);
      setInitialLocation(locations.at(0));
    } catch (error) {
      console.log('error obteniendo locaciones');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    isFetching.current = true;

    getLocations();

    () => {
      isFetching.current = false;
      return;
    };
  }, dynamicParams);

  return { loadingLocations: loading, locations, getLocations };
};

export default useGetLocations;
