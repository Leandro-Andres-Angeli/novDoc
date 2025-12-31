import geoRefAxiosInstance, {
  geoRefAxiosInstanceEndpoints,
} from 'axios/geoRef';
import React, { useState } from 'react';
import { MapLocation } from 'src/types/dbTypes/IJobPosting';
import { GeoLocationReversed } from 'src/types/geoRefResponses/geoLocationReversed';
import { Toast } from 'toastify-react-native';

const useGetLocationFromCoords = () => {
  const [city, setCity] = useState<MapLocation>();
  const [province, setProvince] = useState<MapLocation>();
  const getLocationFromCoords = async (lat: number, lon: number) => {
    try {
      const { data } = await geoRefAxiosInstance.get<GeoLocationReversed>(
        geoRefAxiosInstanceEndpoints.COORDS(lat.toString(), lon.toString())
      );

      const { provincia, municipio } = data.ubicacion;
      if (!provincia) {
        throw Error('error getting provincia');
      }
      setProvince({ id: provincia.id, nombre: provincia.nombre });
      if (!municipio) {
        throw Error('error getting city');
      }
      setCity({
        id: municipio.id,
        nombre: municipio.nombre,
      });
      return {
        city: {
          id: municipio.id,
          nombre: municipio.nombre,
        },
        province: { id: provincia.id, nombre: provincia.nombre },
      };
    } catch (error) {
      console.log('error get locations ', error);
      Toast.error('Error obteniendo punto geo');
    }
  };
  return { city, province, getLocationFromCoords };
};

export default useGetLocationFromCoords;
