import geoRefAxiosInstance from 'axios/geoRef';
import { useEffect, useRef, useState } from 'react';

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
      const { data } = await geoRefAxiosInstance.get<Q>(url);
      const locations = data[key];
      setLocations(locations);
      setInitialLocation(locations.at(0));
    } catch (error) {
      console.log('error obteniendo provincias');
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
