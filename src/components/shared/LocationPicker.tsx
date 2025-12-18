import AppLoading from '@ui/AppLoading';
import AppReactNativePaperSelect from '@ui/AppReactNativePaperSelect';
import { geoRefAxiosInstanceEndpoints } from 'axios/geoRef';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'react-native-paper';
import { ListItem } from 'react-native-paper-select/lib/typescript/interface/paperSelect.interface';
import useGetLocations from 'src/hooks/useGetLocations';
import { MapLocation } from 'src/types/dbTypes/IJobOffer';
import {
  Ciudad,
  GeoRefCitiesResponse,
} from 'src/types/geoRefResponses/geoRefCities';
import {
  GeoRefProvincesResponse,
  Provincia,
} from 'src/types/geoRefResponses/geoRefProvinces';

interface LocationPickerProps {
  handleSelectProvince: (val: MapLocation) => void;
  handleSelectCity: (val: MapLocation) => void;
  dynamicParams?: string | number[];
  city: MapLocation;
  province: MapLocation;
}
const LocationPicker = ({
  handleSelectProvince,
  handleSelectCity,
  city,
  province,
}: LocationPickerProps) => {
  const theme = useTheme();

  const firstRender = useRef(true);

  const [selectedProvince, setSelectedProvince] = useState<ListItem>(
    province ? { _id: province.id, value: province.nombre } : ({} as ListItem)
  );

  const [selectedCity, setSelectedCity] = useState<ListItem>(
    city ? { _id: city.id, value: city.nombre } : ({} as ListItem)
  );

  const handleSelectProvinceInner = (province: MapLocation) => {
    setSelectedProvince({
      _id: province.id,
      value: province.nombre,
    });
  };

  const handleSelectCityInner = (city: MapLocation) => {
    setSelectedCity({
      _id: city.id,
      value: city.nombre,
    });
  };
  const { loadingLocations: loadingProvinces, locations: provinces } =
    useGetLocations<Provincia, GeoRefProvincesResponse<Provincia>>({
      url: geoRefAxiosInstanceEndpoints.PROVINCES,
      key: 'provincias',
      ...(!province ? { setInitialLocation: handleSelectProvinceInner } : {}),
      // setInitialLocation: handleSelectProvinceInner,
    });
  const { locations: cities, loadingLocations: loadingCities } =
    useGetLocations<Ciudad, GeoRefCitiesResponse>({
      url: geoRefAxiosInstanceEndpoints.MUNICIPIOS(
        selectedProvince?._id ?? '02'
      ),
      key: 'municipios',
      ...(firstRender.current && !city && !firstRender.current
        ? { setInitialLocation: handleSelectCity }
        : {}),
      setInitialLocation: handleSelectCityInner,
      dynamicParams: [selectedProvince?._id],
    });
  useEffect(() => {
    firstRender.current = false;
    if (selectedProvince?._id) {
      handleSelectProvince({
        id: selectedProvince._id,
        nombre: selectedProvince.value,
      });
    }
  }, [selectedProvince._id]);
  useEffect(() => {
    if (selectedProvince?._id) {
      handleSelectCity({ id: selectedCity._id, nombre: selectedCity.value });
    }
  }, [selectedCity._id, selectedProvince._id]);

  const loadingLocations = loadingProvinces || loadingCities;
  if (loadingLocations) {
    return <AppLoading></AppLoading>;
  }
  return (
    (provinces.length > 0 && !loadingLocations && (
      <>
        <AppReactNativePaperSelect
          multiEnable={false}
          value={selectedProvince.value}
          selectedArrayList={[selectedProvince]}
          theme={theme}
          dialogStyle={{ backgroundColor: theme.colors.background }}
          hideSearchBox={true}
          onSelection={(val) => {
            setSelectedProvince({
              _id: val.selectedList.at(0)?._id ?? '',
              value: val.selectedList.at(0)?.value ?? '',
            });
          }}
          arrayList={provinces.map((el) => ({
            ...el,
            _id: el.id,
            nombre: el.iso_nombre,
            label: el.iso_nombre,
            value: el.iso_nombre,
          }))}
          label='Provincia'
        ></AppReactNativePaperSelect>

        <AppReactNativePaperSelect
          multiEnable={false}
          searchText='buscar ciudad'
          value={selectedCity.value}
          selectedArrayList={[selectedCity]}
          theme={theme}
          dialogStyle={{ backgroundColor: theme.colors.background }}
          hideSearchBox={false}
          onSelection={(val) => {
            setSelectedCity({
              _id: val.selectedList.at(0)?._id ?? '',
              value: val.selectedList.at(0)?.value ?? '',
            });
          }}
          arrayList={cities.map((el) => ({
            ...el,
            _id: el.id,
            label: el.nombre,
            value: el.nombre,
          }))}
          label='Ciudad'
        ></AppReactNativePaperSelect>
      </>
    )) || <></>
  );
};

export default LocationPicker;
