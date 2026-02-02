import { Locale } from 'expo-localization';

export const currencyFormatter = (config?: Partial<Locale>) =>
  new Intl.NumberFormat(config?.languageTag || 'es-AR', {
    style: 'currency',
    currencySign: 'standard',
    currency: config?.currencyCode ?? 'ARS',
  });
export default currencyFormatter;
