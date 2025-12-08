import geoRefAxiosInstance, {
  geoRefAxiosInstanceEndpoints,
} from 'axios/geoRef';
import React, { useState } from 'react';
import { MapLocation } from 'src/types/dbTypes/IJobOffer';
import { GeoLocationReversed } from 'src/types/geoRefResponses/geoLocationReversed';

const useGetLocationFromCoords = () => {
  const [city, setCity] = useState<MapLocation>();
  const [province, setProvince] = useState<MapLocation>();
  const getLocationFromCoords = async (lat: number, lon: number) => {
    try {
      const { data } = await geoRefAxiosInstance.get<GeoLocationReversed>(
        geoRefAxiosInstanceEndpoints.COORDS(lat.toString(), lon.toString())
      );
      console.log('dataaa', data);
      const { provincia, departamento, municipio } = data.ubicacion;
      if (!provincia) {
        throw Error('error getting provincia');
      }
      setProvince({ id: provincia.id, nombre: provincia.nombre });
      if (!departamento && !municipio) {
        throw Error('error getting city');
      }
      setCity({
        id: municipio.id ?? departamento.id,
        nombre: municipio.nombre ?? departamento.nombre,
      });
      return {
        city: {
          id: municipio.id ?? departamento.id,
          nombre: municipio.nombre ?? departamento.nombre,
        },
        province: { id: provincia.id, nombre: provincia.nombre },
      };
    } catch (error) {
      console.log('error get locations ', error);
    }
    console.log('fff', city);
    console.log('fff', province);
  };
  return { city, province, getLocationFromCoords };
};

export default useGetLocationFromCoords;
