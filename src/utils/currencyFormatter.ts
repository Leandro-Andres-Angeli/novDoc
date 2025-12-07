import { Locale } from 'expo-localization';

const currencyFormatter = (config: Partial<Locale>) =>
  new Intl.NumberFormat(config.languageTag, {
    style: 'currency',
    currencySign: 'standard',
    currency: config.currencyCode ?? 'ARS',
  });
export default currencyFormatter;
