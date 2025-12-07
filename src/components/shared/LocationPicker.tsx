import AppLoading from '@ui/AppLoading';
import AppReactNativePaperSelect from '@ui/AppReactNativePaperSelect';
import { geoRefAxiosInstanceEndpoints } from 'axios/geoRef';
import { useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';
import { ListItem } from 'react-native-paper-select/lib/typescript/interface/paperSelect.interface';
import useGetLocations from 'src/hooks/useGetLocations';
import {
  Ciudad,
  GeoRefCitiesResponse,
} from 'src/types/geoRefResponses/geoRefCities';
import {
  GeoRefProvincesResponse,
  Provincia,
} from 'src/types/geoRefResponses/geoRefProvinces';

interface LocationPickerProps {
  handleSelectProvince: (val: string) => void;
  handleSelectCity: (val: string) => void;
  dynamicParams?: string | number[];
  city: string;
  province: string;
}
const LocationPicker = ({
  handleSelectProvince,
  handleSelectCity,
}: LocationPickerProps) => {
  const theme = useTheme();

  const [selectedProvince, setSelectedProvince] = useState<ListItem>(
    {} as ListItem
  );
  const [selectedCity, setSelectedCity] = useState<ListItem>({} as ListItem);
  const handleSelectProvinceInner = (province: Provincia) => {
    setSelectedProvince({
      _id: province.id ?? '',
      value: province.iso_nombre ?? '',
    });
  };
  const handleSelectCityInner = (city: Ciudad) => {
    setSelectedCity({
      _id: city.id ?? '',
      value: city.nombre ?? '',
    });
  };
  const { loadingLocations: loadingProvinces, locations: provinces } =
    useGetLocations<Provincia, GeoRefProvincesResponse<Provincia>>({
      url: geoRefAxiosInstanceEndpoints.PROVINCES,
      key: 'provincias',
      setInitialLocation: handleSelectProvinceInner,
    });
  const { locations: cities, loadingLocations: loadingCities } =
    useGetLocations<Ciudad, GeoRefCitiesResponse>({
      url: geoRefAxiosInstanceEndpoints.MUNICIPIOS(
        selectedProvince._id ?? '02'
      ),
      key: 'municipios',
      setInitialLocation: handleSelectCityInner,
      dynamicParams: [selectedProvince._id],
    });
  useEffect(() => {
    if (selectedProvince._id) {
      console.log('setting province');
      handleSelectProvince(selectedProvince.value);
    }
  }, [selectedProvince._id]);
  useEffect(() => {
    if (selectedProvince._id) {
      handleSelectCity(selectedCity.value);
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
            label: el.iso_nombre,
            value: el.iso_nombre,
          }))}
          label='Provincia'
        ></AppReactNativePaperSelect>

        <AppReactNativePaperSelect
          multiEnable={false}
          value={selectedCity.value}
          selectedArrayList={[selectedCity]}
          theme={theme}
          dialogStyle={{ backgroundColor: theme.colors.background }}
          hideSearchBox={true}
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
